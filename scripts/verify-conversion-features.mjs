import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:4173';

async function verifyFeaturesAndCLS() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleErrors.push({ type: msg.type(), text: msg.text() });
    }
  });

  const viewports = [
    { name: 'mobile', width: 375, height: 667, isMobile: true },
    { name: 'tablet', width: 820, height: 1180 },
    { name: 'desktop', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: !!vp.isMobile });
    await page.goto(BASE + '/ru/', { waitUntil: 'networkidle0' });

    // Measure CLS
    const cls = await page.evaluate(() => {
      return new Promise(resolve => {
        let clsScore = 0;
        const observer = new PerformanceObserver(entryList => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(clsScore);
        }, 600);
      });
    });

    // Check crisis protocol presence
    const hasCrisisProtocol = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('Если утрата произошла только что') || text.includes('3 первых действия');
    });

    // Check estimator urgency toggle
    const estimatorInfo = await page.evaluate(() => {
      const urgentBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Экстренный случай'));
      if (urgentBtn) urgentBtn.click();
      const has45MinBadge = document.body.innerText.includes('45 минут');
      return { hasUrgentBtn: !!urgentBtn, has45MinBadge };
    });

    console.log(`Viewport [${vp.name} ${vp.width}px]: CLS=${cls}, CrisisProtocol=${hasCrisisProtocol}, Estimator=${JSON.stringify(estimatorInfo)}`);
  }

  // Test MNE Coordinator Card WhatsApp emphasis
  await page.goto(BASE + '/mne/', { waitUntil: 'networkidle0' });
  const mneCardCta = await page.evaluate(() => {
    const directorSec = document.getElementById('director');
    const ctaBtn = directorSec ? directorSec.querySelector('button') : null;
    return ctaBtn ? ctaBtn.innerText : null;
  });
  console.log('MNE Coordinator Section CTA Button Text:', mneCardCta);

  await browser.close();
  console.log('Console Errors/Warnings count:', consoleErrors.length);
}

verifyFeaturesAndCLS().catch(console.error);

