import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:4173';

async function runVerification() {
  console.log('--- Starting Batch 10 Feature Verification ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox']
  });

  const context = browser.defaultBrowserContext();
  try {
    await context.overridePermissions(BASE, ['clipboard-read', 'clipboard-write']);
  } catch {}

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push({ type: msg.type(), text: msg.text() });
    }
  });

  const viewports = [
    { name: 'mobile (375px)', width: 375, height: 667, isMobile: true },
    { name: 'tablet (820px)', width: 820, height: 1180 },
    { name: 'desktop (1440px)', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: !!vp.isMobile });
    await page.goto(`${BASE}/ru/`, { waitUntil: 'networkidle0' });

    // Check CLS
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

    console.log(`[Viewport ${vp.name}] CLS: ${cls}`);
  }

  // 1. Verify CaseProgressStepper in RouteEstimator on Home page
  console.log('\n--- Testing CaseProgressStepper in RouteEstimator ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/ru/`, { waitUntil: 'networkidle0' });

  const stepperExists = await page.evaluate(() => {
    const text = document.body.innerText;
    return text.includes('4 ключевых этапа международной репатриации под ключ') &&
           text.includes('01') &&
           text.includes('02') &&
           text.includes('03') &&
           text.includes('04');
  });
  console.log('CaseProgressStepper rendered on home page:', stepperExists);

  // Click through stages in CaseProgressStepper
  const stagesTest = await page.evaluate(async () => {
    const s2 = document.querySelector('[data-testid="stepper-stage-02"]');
    const s3 = document.querySelector('[data-testid="stepper-stage-03"]');
    const s4 = document.querySelector('[data-testid="stepper-stage-04"]');

    if (!s2 || !s3 || !s4) return { success: false, s2: !!s2, s3: !!s3, s4: !!s4 };

    // Click stage 02
    s2.click();
    await new Promise(r => setTimeout(r, 100));
    const stage2Active = document.body.innerText.includes('Врачебное свидетельство о смерти') ||
                         document.body.innerText.includes('Potvrda o smrti');

    // Click stage 03
    s3.click();
    await new Promise(r => setTimeout(r, 100));
    const stage3Active = document.body.innerText.includes('цинкового вкладыша');

    // Click stage 04
    s4.click();
    await new Promise(r => setTimeout(r, 100));
    const stage4Active = document.body.innerText.includes('Консульское опечатывание');

    return {
      success: true,
      stage2Active,
      stage3Active,
      stage4Active,
    };
  });
  console.log('CaseProgressStepper interactive switching:', stagesTest);

  // 2. Verify Share Estimate button in RouteEstimator
  console.log('\n--- Testing Share Estimate Action ---');
  await page.click('[data-testid="share-estimate-btn"]');
  await new Promise(r => setTimeout(r, 400));
  const shareTest = await page.evaluate(() => {
    const copiedTextPresent = document.body.innerText.includes('Параметры расчета скопированы');
    return { found: true, copiedTextPresent };
  });
  console.log('Share estimate button test:', shareTest);

  // 3. Verify HotelIncidentProtocol on Location Hub (/ru/location/kotor/)
  console.log('\n--- Testing HotelIncidentProtocol on /ru/location/kotor/ ---');
  await page.goto(`${BASE}/ru/location/kotor/`, { waitUntil: 'networkidle0' });

  const hotelProtocolLocation = await page.evaluate(async () => {
    const text = document.body.innerText;
    const hasTitle = text.includes('Протокол экстренных действий для отелей, вилл и резортов');
    const hasStep1 = text.includes('Изоляция номера и сохранение обстановки');
    const hasStep2 = text.includes('Вызов экстренных служб — 124 и 122');
    const hasStep3 = text.includes('Деликатная эвакуация и защита репутации объекта');

    const printBtn = Array.from(document.querySelectorAll('button')).find(b =>
      b.innerText.includes('Скачать памятку для персонала')
    );

    let modalOpened = false;
    if (printBtn) {
      printBtn.click();
      await new Promise(r => setTimeout(r, 300));
      modalOpened = document.body.innerText.includes('ПАМЯТКА СЛУЖБЫ БЕЗОПАСНОСТИ ОТЕЛЯ / РЕЗОРТА');
    }

    return {
      hasTitle,
      hasStep1,
      hasStep2,
      hasStep3,
      hasPrintBtn: !!printBtn,
      modalOpened,
    };
  });
  console.log('HotelIncidentProtocol on /ru/location/kotor/:', hotelProtocolLocation);

  // 4. Verify HotelIncidentProtocol on Guide (/ru/guides/hotel-resort-death-protocol/)
  console.log('\n--- Testing HotelIncidentProtocol on /ru/guides/hotel-resort-death-protocol/ ---');
  await page.goto(`${BASE}/ru/guides/hotel-resort-death-protocol/`, { waitUntil: 'networkidle0' });

  const hotelProtocolGuide = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasProtocol: text.includes('Протокол экстренных действий для отелей, вилл и резортов'),
      hasEmergency124: text.includes('124') && text.includes('122'),
    };
  });
  console.log('HotelIncidentProtocol on guide page:', hotelProtocolGuide);

  // 5. Verify CaseProgressStepper on Corridor Page (/ru/repatriation/to-germany/)
  console.log('\n--- Testing CaseProgressStepper on /ru/repatriation/to-germany/ ---');
  await page.goto(`${BASE}/ru/repatriation/to-germany/`, { waitUntil: 'networkidle0' });

  const stepperOnCorridor = await page.evaluate(() => {
    const text = document.body.innerText;
    return text.includes('4 ключевых этапа международной репатриации под ключ');
  });
  console.log('CaseProgressStepper rendered on corridor page:', stepperOnCorridor);

  // 6. Verify MobileEmergencyBar Micro-caption and Idle Pulse
  console.log('\n--- Testing MobileEmergencyBar on Mobile Viewport ---');
  await page.setViewport({ width: 375, height: 667, isMobile: true });
  await page.goto(`${BASE}/ru/`, { waitUntil: 'networkidle0' });

  // Scroll down to make MobileEmergencyBar appear (> 400px)
  await page.evaluate(() => window.scrollTo(0, 600));
  await new Promise(r => setTimeout(r, 300));

  const mobileBarInfo = await page.evaluate(async () => {
    const text = document.body.innerText;
    const hasMicroCaption = text.includes('Круглосуточный русско- и англоязычный дежурный координатор');

    // Find the call button in mobile bar
    const callBtn = Array.from(document.querySelectorAll('button')).find(b =>
      b.getAttribute('aria-label') && b.getAttribute('aria-label').includes('Позвонить 24/7')
    );

    const initialClasses = callBtn ? callBtn.className : '';

    // Wait 5.2 seconds for idle timer to trigger
    await new Promise(r => setTimeout(r, 5200));

    const idleClasses = callBtn ? callBtn.className : '';
    const hasPulse = idleClasses.includes('animate-pulse');

    return {
      hasMicroCaption,
      hasCallBtn: !!callBtn,
      initialHasPulse: initialClasses.includes('animate-pulse'),
      idleHasPulse: hasPulse,
    };
  });
  console.log('MobileEmergencyBar test:', mobileBarInfo);

  console.log('\n--- Console Errors Check ---');
  console.log(`Console error count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('\n--- Batch 10 Verification Finished Successfully ---');
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
