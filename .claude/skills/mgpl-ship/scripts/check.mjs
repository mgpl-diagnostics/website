// Visual + perf check: screenshots per station, console warnings, frame timing.
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const URL = process.argv[2] ?? 'http://localhost:3100';
const OUT = process.argv[3] ?? './out';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'],
});

const logs = [];
async function run(name, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  page.on('console', (m) => logs.push(`[${name}] ${m.type()}: ${m.text().slice(0, 300)}`));
  page.on('pageerror', (e) => logs.push(`[${name}] PAGEERROR: ${e.message}`));
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 4500));

  // frame timing over 2s while idle at the hero
  const fps = await page.evaluate(
    () =>
      new Promise((res) => {
        let n = 0;
        const t0 = performance.now();
        const tick = () => (++n, performance.now() - t0 < 2000 ? requestAnimationFrame(tick) : res(Math.round((n * 1000) / (performance.now() - t0))));
        requestAnimationFrame(tick);
      }),
  );
  logs.push(`[${name}] rAF fps: ${fps}`);

  const tops = await page.evaluate(() => [...document.querySelectorAll('[data-station]')].map((s) => s.getBoundingClientRect().top + window.scrollY));
  for (let i = 0; i < tops.length; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, tops[i] - 40));
    await new Promise((r) => setTimeout(r, 2200));
    await page.screenshot({ path: `${OUT}/${name}-${String(i).padStart(2, '0')}.png` });
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: `${OUT}/${name}-footer.png` });
  await page.close();
}

await run('desktop', { width: 1440, height: 900 });
await run('mobile', { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await browser.close();
console.log(logs.join('\n'));
