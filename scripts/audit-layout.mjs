/**
 * Automated layout auditor: mobile horizontal overflow + desktop card symmetry.
 * Usage: node scripts/audit-layout.mjs [--base=http://localhost:4173] [--all]
 *  - default: the 9 archetype routes
 *  - --all:   every URL in public/sitemap.xml (all locales)
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const arg = (k, d) => (process.argv.find((a) => a.startsWith(`--${k}=`)) ?? `--${k}=${d}`).split('=')[1];
const BASE = arg('base', 'http://localhost:4173');
const ALL = process.argv.includes('--all');

const ARCHETYPES = [
  '/en/', '/ru/', '/mne/',
  '/ru/pricing-breakdown/',
  '/en/repatriation/to-united-kingdom/',
  '/ru/mortuary/opsta-bolnica-kotor/',
  '/mne/transit/dobrakovo-serbia/',
  '/en/assistance/allianz-assistance/',
  '/ru/guides/hotel-resort-death-protocol/',
];

function routes() {
  const only = arg('only', '');
  if (only) return only.split(',');
  if (!ALL) return ARCHETYPES;
  const xml = fs.readFileSync('public/sitemap.xml', 'utf8');
  return [...xml.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
}

// ---- Check A: horizontal overflow (runs in page context) ----
const overflowProbe = () => {
  const cw = document.documentElement.clientWidth;
  const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  const clippedByAncestor = (el) => {
    // NOTE: <body>/<html> overflow is propagated to the viewport and does NOT clip content,
    // so they must not count as clipping ancestors.
    for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === 'hidden' || ox === 'clip' || ox === 'auto' || ox === 'scroll') {
        const r = p.getBoundingClientRect();
        if (r.right <= cw + 1) return true;
      }
    }
    return false;
  };
  const offenders = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.right > cw + 1 && !clippedByAncestor(el)) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || undefined,
        cls: String(el.className || '').slice(0, 90),
        right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  });
  return { cw, sw, hasOverflow: sw > cw, offenders: offenders.slice(0, 8), offenderCount: offenders.length };
};

// ---- Check B: card height / CTA baseline symmetry (desktop) ----
const symmetryProbe = () => {
  const issues = [];
  const isCard = (el) => {
    const cs = getComputedStyle(el);
    return (
      el.children.length > 0 &&
      parseFloat(cs.borderTopWidth) > 0 &&
      parseFloat(cs.borderTopLeftRadius) >= 8 &&
      el.getBoundingClientRect().height > 60
    );
  };
  document.querySelectorAll('main *, section *').forEach((grid) => {
    const cs = getComputedStyle(grid);
    if (cs.display !== 'grid') return;
    const kids = [...grid.children].filter((c) => isCard(c));
    if (kids.length < 2) return;
    const rows = new Map();
    kids.forEach((k) => {
      const r = k.getBoundingClientRect();
      const key = Math.round(r.top / 4);
      if (!rows.has(key)) rows.set(key, []);
      rows.get(key).push({ k, r });
    });
    rows.forEach((row) => {
      if (row.length < 2) return;
      const hs = row.map((x) => x.r.height);
      const delta = Math.max(...hs) - Math.min(...hs);
      // CTA = last link/button inside each card
      const ctaTops = row
        .map((x) => {
          const els = x.k.querySelectorAll('a[href], button');
          const last = els[els.length - 1];
          return last ? last.getBoundingClientRect().bottom - x.r.top : null;
        })
        .filter((v) => v !== null);
      const ctaBottomOffsets = row
        .map((x) => {
          const els = x.k.querySelectorAll('a[href], button');
          const last = els[els.length - 1];
          return last ? x.r.bottom - last.getBoundingClientRect().bottom : null;
        })
        .filter((v) => v !== null);
      const ctaDelta = ctaBottomOffsets.length > 1 ? Math.max(...ctaBottomOffsets) - Math.min(...ctaBottomOffsets) : 0;
      // Inner alignment: top offset of the h2/h3 and of any price-like serif block inside each card
      const innerDelta = (sel) => {
        const offs = row
          .map((x) => {
            const n = x.k.querySelector(sel);
            return n ? n.getBoundingClientRect().top - x.r.top : null;
          })
          .filter((v) => v !== null);
        return offs.length === row.length && offs.length > 1 ? Math.max(...offs) - Math.min(...offs) : 0;
      };
      const priceDelta = innerDelta('p.font-serif, .font-serif.font-bold');
      if (delta > 2 || ctaDelta > 2 || priceDelta > 2) {
        issues.push({
          grid: String(grid.className).slice(0, 60),
          cards: row.length,
          heights: hs.map(Math.round),
          heightDelta: Math.round(delta),
          ctaBottomGapDelta: Math.round(ctaDelta),
          priceTopDelta: Math.round(priceDelta),
        });
      }
    });
  });
  return issues;
};

// Pricing-specific: compare vertical position of price blocks across a row
const pricingProbe = () => {
  const grid = document.querySelector('#pricing-tiers .grid');
  if (!grid) return null;
  const cards = [...grid.children];
  const rows = new Map();
  cards.forEach((c) => {
    const r = c.getBoundingClientRect();
    const key = Math.round(r.top / 4);
    const price = c.querySelector('p.font-serif');
    const cta = c.querySelector('a[href]');
    if (!rows.has(key)) rows.set(key, []);
    rows.get(key).push({
      h: Math.round(r.height),
      priceTop: price ? Math.round(price.getBoundingClientRect().top - r.top) : null,
      ctaTop: cta ? Math.round(cta.getBoundingClientRect().top - r.top) : null,
      ctaBottomGap: cta ? Math.round(r.bottom - cta.getBoundingClientRect().bottom) : null,
    });
  });
  return [...rows.values()].map((row) => ({
    heights: row.map((x) => x.h),
    priceTopOffsets: row.map((x) => x.priceTop),
    ctaBottomGaps: row.map((x) => x.ctaBottomGap),
    priceDelta: Math.max(...row.map((x) => x.priceTop)) - Math.min(...row.map((x) => x.priceTop)),
  }));
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
const consoleIssues = [];
page.on('console', (m) => ['error', 'warning'].includes(m.type()) && consoleIssues.push(m.text()));
page.on('pageerror', (e) => consoleIssues.push(String(e)));

const list = routes();
const mobileFails = [];
const symmetryFails = [];
const pricingReports = [];

console.log(`Auditing ${list.length} URL(s) @ ${BASE}${ALL ? ' (full sitemap)' : ''}`);

for (const p of list) {
  // Mobile 375x667
  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await page.goto(BASE + p, { waitUntil: 'networkidle0' });
  const m = await page.evaluate(overflowProbe);
  if (m.hasOverflow || m.offenderCount > 0) mobileFails.push({ path: p, ...m });

  // Desktop 1440x900
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + p, { waitUntil: 'networkidle0' });
  const s = await page.evaluate(symmetryProbe);
  if (s.length) symmetryFails.push({ path: p, issues: s });

  // Pricing tiers at tablet / laptop / desktop (different title wrapping per width)
  for (const w of [820, 1024, 1440]) {
    await page.setViewport({ width: w, height: 900 });
    const pr = await page.evaluate(pricingProbe);
    if (pr) {
      pricingReports.push({ path: p, width: w, rows: pr });
      pr.forEach((row) => {
        if (row.priceDelta > 2) symmetryFails.push({ path: p, issues: [{ grid: `#pricing-tiers @${w}px`, priceTopDelta: row.priceDelta }] });
      });
    }
  }
}

await browser.close();

console.log('\n=== CHECK A: MOBILE HORIZONTAL OVERFLOW (375px) ===');
console.log(mobileFails.length ? 'FAIL' : 'PASS', `- ${mobileFails.length}/${list.length} pages overflow`);
mobileFails.forEach((f) => console.log(JSON.stringify(f)));

console.log('\n=== CHECK B: CARD HEIGHT / CTA BASELINE (1440px) ===');
console.log(symmetryFails.length ? 'FAIL' : 'PASS', `- ${symmetryFails.length}/${list.length} pages with asymmetric rows`);
symmetryFails.forEach((f) => console.log(JSON.stringify(f)));

console.log('\n=== PRICING TIERS DETAIL ===');
pricingReports.forEach((r) => console.log(r.path, `@${r.width}`, JSON.stringify(r.rows)));

console.log('\n=== CONSOLE ===');
console.log(consoleIssues.length ? consoleIssues : 'clean');

process.exit(mobileFails.length || symmetryFails.length ? 1 : 0);

