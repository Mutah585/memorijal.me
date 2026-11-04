import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:4173';

async function verifyLanguageAutoRedirect() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox']
  });

  const tests = [
    { lang: 'ru-RU,ru;q=0.9', expectedRedirect: '/ru/' },
    { lang: 'sr-RS,sr;q=0.9,hr;q=0.8', expectedRedirect: '/mne/' },
    { lang: 'de-DE,de;q=0.9,en;q=0.8', expectedRedirect: '/en/' },
    { lang: 'en-US,en;q=0.9', expectedRedirect: '/en/' },
  ];

  console.log('=== PART 1: TEST AUTO-LANGUAGE DETECTION FROM ROOT "/" ===');
  for (const t of tests) {
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ 'Accept-Language': t.lang });
    // Emulate browser navigator.languages
    await page.evaluateOnNewDocument((langHeader) => {
      const langs = langHeader.split(',').map(part => part.split(';')[0].trim());
      Object.defineProperty(navigator, 'languages', { get: () => langs });
      Object.defineProperty(navigator, 'language', { get: () => langs[0] });
    }, t.lang);

    await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
    const finalUrl = page.url();
    const passed = finalUrl.endsWith(t.expectedRedirect);
    console.log(`[${passed ? 'PASS' : 'FAIL'}] Accept-Language: ${t.lang} -> Redirected to: ${finalUrl} (Expected: ${t.expectedRedirect})`);
    await page.close();
  }

  console.log('\n=== PART 2: VERIFY MANUAL TOGGLE PERSISTENCE IN LOCALSTORAGE ===');
  {
    const page = await browser.newPage();
    // Start with Russian browser language
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'languages', { get: () => ['ru-RU', 'ru'] });
      Object.defineProperty(navigator, 'language', { get: () => 'ru-RU' });
    });
    await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
    console.log('Initial landing URL (ru-RU browser):', page.url());

    // Switch to EN explicitly via button
    await page.evaluate(() => {
      const enBtn = Array.from(document.querySelectorAll('div[role="group"] button')).find(b => b.innerText.trim() === 'EN');
      if (enBtn) enBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));
    const switchedUrl = page.url();
    const storedLang = await page.evaluate(() => localStorage.getItem('memorijal_lang'));
    console.log('Switched URL:', switchedUrl, '| localStorage memorijal_lang:', storedLang);

    // Now reload root "/" and check that manual preference overrides browser lang
    await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
    console.log('Re-landed on "/" with saved preference:', page.url(), '| Expected: /en/');
    await page.close();
  }

  console.log('\n=== PART 3: TEST HEADER BRAND LOCKUP RESPONSIVENESS (1024px to 1440px) ===');
  {
    const page = await browser.newPage();
    for (const width of [1024, 1280, 1440]) {
      await page.setViewport({ width, height: 800 });
      await page.goto(BASE + '/ru/', { waitUntil: 'networkidle0' });
      const metrics = await page.evaluate(() => {
        const titleEl = document.querySelector('header a span.font-serif');
        const subtitleEl = document.querySelector('header a span.uppercase');
        const crestEl = document.querySelector('header a img');
        return {
          titleText: titleEl?.innerText,
          subtitleText: subtitleEl?.innerText,
          crestWidth: crestEl?.getBoundingClientRect().width,
          crestHeight: crestEl?.getBoundingClientRect().height,
          subtitleHeight: subtitleEl?.getBoundingClientRect().height,
        };
      });
      console.log(`Viewport ${width}px: crest=${metrics.crestWidth}x${metrics.crestHeight}px, subtitleHeight=${metrics.subtitleHeight}px ("${metrics.subtitleText}")`);
    }
    await page.close();
  }

  await browser.close();
}

verifyLanguageAutoRedirect().catch(console.error);

