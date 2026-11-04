import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve(process.cwd(), '.temp-audit');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const logs = [];
  const errors = [];

  const page = await browser.newPage();
  page.on('console', (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', (err) => errors.push(err.toString()));

  console.log('=== 1. DESKTOP HOMEPAGE INSPECTION (1440x900) ===');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/ru/', { waitUntil: 'networkidle0' });

  // 1. Header & Brand Crest Dimensions
  const crestMetrics = await page.evaluate(() => {
    const img = document.querySelector('header img[src*="emblem-crest"]');
    if (!img) return null;
    const rect = img.getBoundingClientRect();
    const computed = window.getComputedStyle(img);
    return {
      width: rect.width,
      height: rect.height,
      aspectRatio: (rect.width / rect.height).toFixed(3),
      alt: img.getAttribute('alt'),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      objectFit: computed.objectFit,
    };
  });
  console.log('Desktop Crest Metrics:', JSON.stringify(crestMetrics, null, 2));

  // Top Bar Hotline Check
  const topBarInfo = await page.evaluate(() => {
    const text = document.body.innerText;
    const hasPhone = text.includes('+382 68 914 816');
    const waLink = document.querySelector('header a[href*="wa.me"]');
    return {
      hasPhone,
      waHref: waLink ? waLink.getAttribute('href') : null,
      waRel: waLink ? waLink.getAttribute('rel') : null,
      waTarget: waLink ? waLink.getAttribute('target') : null,
    };
  });
  console.log('Desktop Top Bar Info:', JSON.stringify(topBarInfo, null, 2));

  await page.screenshot({ path: path.join(outDir, 'desktop-homepage.png'), fullPage: false });

  // 2. CTA & Modal Testing
  console.log('=== 2. MODAL TEST ===');
  const emergencyBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('header button'));
    return buttons.find(b => b.innerText.includes('Экстренная связь') || b.innerText.includes('Emergency') || b.innerText.includes('Hitni'));
  });

  let modalOpened = false;
  let bodyOverflowLocked = false;
  if (emergencyBtn) {
    await emergencyBtn.click();
    await new Promise(r => setTimeout(r, 400));
    modalOpened = await page.evaluate(() => !!document.querySelector('[role="dialog"]'));
    bodyOverflowLocked = await page.evaluate(() => document.body.style.overflow === 'hidden');
  }
  console.log('Modal opened:', modalOpened, 'Body overflow locked:', bodyOverflowLocked);

  // Close modal via close button
  if (modalOpened) {
    const closeBtn = await page.$('[role="dialog"] button[aria-label]');
    if (closeBtn) {
      await closeBtn.click();
      await new Promise(r => setTimeout(r, 400));
    }
  }

  // 3. Language Switcher (EN / RU / MNE) & Diacritic/Term Audit
  console.log('=== 3. LANGUAGE SWITCHER AUDIT ===');
  const langResults = {};
  for (const langCode of ['EN', 'RU', 'MNE']) {
    const btn = await page.evaluateHandle((code) => {
      const buttons = Array.from(document.querySelectorAll('div[role="group"] button'));
      return buttons.find(b => b.innerText.trim() === code);
    }, langCode);

    if (btn) {
      await btn.click();
      await new Promise(r => setTimeout(r, 400));
      const bodyText = await page.evaluate(() => document.body.innerText);
      const url = page.url();
      const hasMissingKey = /MISSING_KEY|undefined|null/i.test(bodyText);
      const hasGruz200 = /Груз\s*200/i.test(bodyText);
      const hasMneDiacritics = /[čćžšđ]/i.test(bodyText);

      langResults[langCode] = {
        url,
        hasMissingKey,
        hasGruz200,
        hasMneDiacritics,
        h1: await page.evaluate(() => document.querySelector('h1')?.innerText),
      };
    }
  }
  console.log('Language Switch Results:', JSON.stringify(langResults, null, 2));

  // 4. Pricing Presentation Audit
  console.log('=== 4. PRICING PRESENTATION AUDIT ===');
  await page.goto('http://localhost:4173/ru/pricing-breakdown/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'desktop-pricing.png'), fullPage: false });

  const pricingAudit = await page.evaluate(() => {
    const text = document.body.innerText;
    const hasOpenEndedRu = /от\s*\d[\d\s]*€/i.test(text);
    const hasDashRange = /\d[\d\s]*€\s*[–—-]\s*\d[\d\s]*€/i.test(text);
    const pricesFound = text.match(/от\s*[\d\s\u00A0.]+€/gi) || [];
    return {
      hasOpenEndedRu,
      hasDashRange,
      samplePrices: pricesFound.slice(0, 8),
    };
  });
  console.log('Pricing Audit:', JSON.stringify(pricingAudit, null, 2));

  // 5. Mobile Viewport (375x812) & Mobile Modal
  console.log('=== 5. MOBILE VIEWPORT AUDIT (375x812) ===');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:4173/ru/', { waitUntil: 'networkidle0' });

  const mobileCrestMetrics = await page.evaluate(() => {
    const img = document.querySelector('header img[src*="emblem-crest"]');
    if (!img) return null;
    const rect = img.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      aspectRatio: (rect.width / rect.height).toFixed(3),
    };
  });
  console.log('Mobile Crest Metrics:', JSON.stringify(mobileCrestMetrics, null, 2));

  // Check mobile phone link
  const mobilePhoneHref = await page.evaluate(() => {
    const phoneLinks = Array.from(document.querySelectorAll('a[href^="tel:"]'));
    return phoneLinks.map(a => a.getAttribute('href'));
  });
  console.log('Mobile Phone hrefs:', mobilePhoneHref);

  await page.screenshot({ path: path.join(outDir, 'mobile-homepage.png'), fullPage: false });

  // Open mobile menu to trigger coordinator modal or click Hero emergency button
  const heroEmergencyBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.innerText.includes('Экстренная связь') || b.innerText.includes('Связаться'));
  });
  if (heroEmergencyBtn) {
    try {
      await heroEmergencyBtn.click();
      await new Promise(r => setTimeout(r, 400));
    } catch (e) {
      console.log('Could not click hero button on mobile:', e.message);
    }
  }
  await page.screenshot({ path: path.join(outDir, 'mobile-modal-open.png'), fullPage: false });

  // 6. Footer & Regulatory Audit
  console.log('=== 6. FOOTER AUDIT ===');
  const footerAudit = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return null;
    const text = footer.innerText;
    const crestImg = footer.querySelector('img[src*="emblem-crest"]');
    const links = Array.from(footer.querySelectorAll('a[target="_blank"]'));
    const safeLinks = links.every(l => l.getAttribute('rel')?.includes('noopener') && l.getAttribute('rel')?.includes('noreferrer'));
    return {
      hasPib: text.includes('03489217'),
      hasPdv: text.includes('30/31-20948-4'),
      allBlankLinksSafe: safeLinks,
      crestPresent: !!crestImg,
      crestAlt: crestImg?.getAttribute('alt'),
    };
  });
  console.log('Footer Audit:', JSON.stringify(footerAudit, null, 2));

  console.log('=== ERRORS & CONSOLE LOGS ===');
  console.log('Page Errors count:', errors.length, errors);
  const warnOrErr = logs.filter(l => l.includes('[error]') || l.includes('[warning]'));
  console.log('Console warnings/errors:', warnOrErr);

  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
