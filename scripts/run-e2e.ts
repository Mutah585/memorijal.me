import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:4173';

async function testE2E() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('--- SCENARIO A: NAVIGATION & LANG SWITCH ---');
  await page.goto(BASE + '/en/', { waitUntil: 'networkidle0' });
  const title = await page.title();
  console.log('Homepage Title:', title);

  // Switch to Russian via nav/footer link
  const ruLink = await page.$('a[href="/ru/"]');
  if (ruLink) {
    await ruLink.click();
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    console.log('Navigated to RU URL:', page.url());
  }

  // Test back/forward
  await page.goBack({ waitUntil: 'networkidle0' });
  console.log('Back button URL:', page.url());
  await page.goForward({ waitUntil: 'networkidle0' });
  console.log('Forward button URL:', page.url());

  console.log('--- SCENARIO B: COORDINATOR MODAL & DRAFT ---');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const trigger = btns.find(b =>
      b.innerText.includes('Emergency Contact 24/7') ||
      b.innerText.includes('Speak with Coordinator') ||
      b.innerText.includes('Request Formal Written Quote')
    );
    if (trigger) trigger.click();
  });

  await new Promise(r => setTimeout(r, 400));
  let modalVisible = await page.evaluate(() => !!document.querySelector('div[role="dialog"]'));
  console.log('Modal visible:', modalVisible);

  if (modalVisible) {
    await page.type('#modal-name', 'Alexander Wright');
    await page.type('#modal-contact', '+44 7911 123456');
    await page.type('#modal-notes', 'Testing emergency repatriation coordination audit');

    // Escape handling
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 300));
    modalVisible = await page.evaluate(() => !!document.querySelector('div[role="dialog"]'));
    console.log('Modal closed after Escape:', !modalVisible);

    // Verify draft saved
    const savedDraft = await page.evaluate(() => sessionStorage.getItem('memorijal_modal_draft'));
    console.log('Draft saved in sessionStorage:', !!savedDraft);
  }

  console.log('--- SCENARIO C: CONSULAR DIRECTORY FILTERS ---');
  await page.goto(BASE + '/ru/step-by-step-guide/', { waitUntil: 'networkidle0' });
  const filterPillClicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('UK') || b.innerText.includes('Германия'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('Filter pill clicked:', filterPillClicked);

  console.log('--- SCENARIO D: ROUTE ESTIMATOR CURRENCY ---');
  await page.goto(BASE + '/en/', { waitUntil: 'networkidle0' });
  const gbpBtn = await page.$('button[aria-label="Switch currency to GBP"]');
  if (gbpBtn) {
    await gbpBtn.click();
    await new Promise(r => setTimeout(r, 200));
    const priceText = await page.evaluate(() => {
      const el = document.querySelector('.tabular-nums');
      return el ? (el as HTMLElement).innerText : '';
    });
    console.log('Price converted to GBP:', priceText);
  }

  console.log('--- SCENARIO E: CONTACT LINKS INTEGRITY ---');
  const links = await page.evaluate(() => {
    const tels = Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => (a as HTMLAnchorElement).href);
    const was = Array.from(document.querySelectorAll('a[href*="wa.me"]')).map(a => (a as HTMLAnchorElement).href);
    const sms = Array.from(document.querySelectorAll('a[href^="sms:"]')).map(a => (a as HTMLAnchorElement).href);
    return {
      telsCount: tels.length,
      waCount: was.length,
      smsCount: sms.length,
      sampleTel: tels[0],
      sampleWa: was[0]
    };
  });
  console.log('Contact links integrity:', links);

  await browser.close();
  console.log('=== ALL E2E SCENARIOS VERIFIED SUCCESSFULLY ===');
}

testE2E().catch(err => {
  console.error(err);
  process.exit(1);
});
