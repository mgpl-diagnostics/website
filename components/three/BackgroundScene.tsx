'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const REDUCE = '(prefers-reduced-motion: reduce)';
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

/**
 * Fixed full-viewport 3D background. The three.js engine is imported on
 * idle (never competes with LCP), fades in once it has rendered, and is a
 * single static frame for reduced-motion visitors.
 */
export default function BackgroundScene() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCE).matches, () => false);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;

    const id = idle(async () => {
      const { createLabScene } = await import('./engine');
      if (cancelled || !canvas.current) return;
      try {
        dispose = createLabScene(canvas.current, { animate: !reduced, onReady: () => setReady(true) }).dispose;
      } catch {
        // No WebGL: the page is complete without the background
      }
    });

    return () => {
      cancelled = true;
      cancelIdle(id as number);
      dispose?.();
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      data-ready={ready || undefined}
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-[1400ms] ease-out-strong data-[ready]:opacity-40 lg:data-[ready]:opacity-100"
    >
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
