/**
 * Captures design-review screenshots into .visual-review/
 * Usage: node scripts/visual-review.mjs [--base=http://localhost:4173] [--lang=en]
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const arg = (k, d) => (process.argv.find((a) => a.startsWith(`--${k}=`)) ?? `--${k}=${d}`).split('=')[1];
const BASE = arg('base', 'http://localhost:4173');
const LANG = arg('lang', 'en');
const OUT = path.resolve('.visual-review');
fs.mkdirSync(OUT, { recursive: true });

const settle = async (page) => {
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();

// 1. Mobile header + hero, 2x density so detail is inspectable
await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await page.goto(`${BASE}/${LANG}/`, { waitUntil: 'networkidle0' });
await settle(page);
await page.screenshot({ path: path.join(OUT, 'mobile-header-375.png'), clip: { x: 0, y: 0, width: 375, height: 560 } });

// 3. Mobile full page (1x to keep file size sane)
await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
await page.goto(`${BASE}/${LANG}/`, { waitUntil: 'networkidle0' });
await settle(page);
await page.screenshot({ path: path.join(OUT, 'mobile-fullpage-375.png'), fullPage: true });

// 2. Desktop pricing tiers, viewport scrolled to the section
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(`${BASE}/${LANG}/`, { waitUntil: 'networkidle0' });
await settle(page);
const y = await page.evaluate(() => {
  const s = document.querySelector('#pricing-tiers');
  return s ? s.getBoundingClientRect().top + window.scrollY : 0;
});
await page.evaluate((top) => window.scrollTo(0, top - 80), y);
await settle(page);
await page.screenshot({ path: path.join(OUT, 'desktop-pricing-1440.png') });

// Bonus: full pricing section incl. second row, for rhythm review
const sec = await page.$('#pricing-tiers');
if (sec) await sec.screenshot({ path: path.join(OUT, 'desktop-pricing-section-1440.png') });

await browser.close();
for (const f of fs.readdirSync(OUT)) {
  console.log(f, `${(fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0)} KB`);
}

