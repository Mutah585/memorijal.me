import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:4173';

async function auditLighthouseCriteria() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Emulate Moto G4 / mobile screen (360x640) or standard mobile (375x667)
  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));

  await page.goto(BASE + '/en/', { waitUntil: 'networkidle0' });

  // 1. Accessibility Checks (Images without alt, form fields without labels, buttons without aria-label or text)
  const a11yAudit = await page.evaluate(() => {
    const issues = [];
    
    // Check images
    document.querySelectorAll('img').forEach(img => {
      if (!img.getAttribute('alt')) {
        issues.push({ type: 'img-alt-missing', src: img.src });
      }
    });

    // Check buttons
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.innerText.trim();
      const aria = btn.getAttribute('aria-label') || btn.getAttribute('aria-labelledby');
      if (!text && !aria) {
        issues.push({ type: 'button-name-missing', html: btn.outerHTML.slice(0, 100) });
      }
    });

    // Check inputs
    document.querySelectorAll('input, select, textarea').forEach(input => {
      const id = input.id;
      const aria = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;
      if (!aria && !label) {
        issues.push({ type: 'input-label-missing', id, tag: input.tagName });
      }
    });

    // Color contrast for critical muted text
    const textEls = document.querySelectorAll('p, span, h1, h2, h3, a, button');
    let lowContrastCount = 0;
    
    return {
      issues,
      hasThemeColor: !!document.querySelector('meta[name="theme-color"]'),
      hasManifest: !!document.querySelector('link[rel="manifest"]'),
      themeColor: document.querySelector('meta[name="theme-color"]')?.getAttribute('content'),
      manifestHref: document.querySelector('link[rel="manifest"]')?.getAttribute('href'),
      hasDescription: !!document.querySelector('meta[name="description"]'),
      hasViewport: !!document.querySelector('meta[name="viewport"]'),
      lang: document.documentElement.lang,
    };
  });

  // 2. Cumulative Layout Shift probe
  const clsValue = await page.evaluate(() => {
    return new Promise(resolve => {
      let cls = 0;
      const observer = new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => {
        observer.disconnect();
        resolve(cls);
      }, 1000);
    });
  });

  // 3. Check Best Practices (rel="noopener noreferrer" on target="_blank")
  const linkSafety = await page.evaluate(() => {
    const blanks = Array.from(document.querySelectorAll('a[target="_blank"]'));
    const unsafe = blanks.filter(a => {
      const rel = a.getAttribute('rel') || '';
      return !rel.includes('noopener') || !rel.includes('noreferrer');
    });
    return {
      totalBlankLinks: blanks.length,
      unsafeCount: unsafe.length,
      unsafeHrefs: unsafe.map(a => a.href)
    };
  });

  await browser.close();

  console.log('=== PRE-LAUNCH LIGHTHOUSE & WCAG MOBILE AUDIT ===');
  console.log('Theme Color:', a11yAudit.themeColor);
  console.log('Manifest Link:', a11yAudit.manifestHref);
  console.log('HTML Lang:', a11yAudit.lang);
  console.log('Accessibility Issues Found:', JSON.stringify(a11yAudit.issues, null, 2));
  console.log('CLS Value:', clsValue);
  console.log('Link Security (_blank):', JSON.stringify(linkSafety, null, 2));
  console.log('Console Warnings/Errors:', consoleLogs.filter(m => ['warning', 'error'].includes(m.type)));
}

auditLighthouseCriteria().catch(console.error);

