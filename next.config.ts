import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy. The site is static: scripts, styles, fonts and 3D models all come from
 * this origin. 'unsafe-inline' for scripts is needed by Next.js's inline bootstrap and the
 * motion-pref script in app/layout.tsx (a nonce would make every page dynamic); the policy still
 * blocks scripts from any other origin, plugins, <base> hijacking, framing and off-site forms.
 * GLTFLoader turns embedded textures into blob: URLs, hence blob:/data: for images and fetches.
 * Dev mode (React Refresh) needs 'unsafe-eval' and a websocket.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' data: blob:${dev ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(dev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
