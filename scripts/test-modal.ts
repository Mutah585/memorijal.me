import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:4173/en/';

async function testModal() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE, { waitUntil: 'networkidle0' });

  // Click hero coordinator CTA
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const heroBtn = btns.find(b => b.innerText.includes('Emergency Contact 24/7') || b.innerText.includes('Speak with Coordinator'));
    if (heroBtn) {
      heroBtn.click();
      return true;
    }
    return false;
  });

  console.log('Hero CTA Clicked:', clicked);
  await new Promise(r => setTimeout(r, 600));

  const dialogVisible = await page.evaluate(() => {
    const el = document.querySelector('div[role="dialog"]');
    return el ? { visible: true, title: el.querySelector('h2')?.innerText } : { visible: false };
  });

  console.log('Dialog status:', dialogVisible);

  if (dialogVisible.visible) {
    // Fill in form
    await page.type('#modal-name', 'Elena Rostova');
    await page.type('#modal-contact', '+382 68 111 222');
    await page.type('#modal-notes', 'Urgent transfer from Kotor Hospital');

    // Press Escape
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));

    const stillVisible = await page.evaluate(() => !!document.querySelector('div[role="dialog"]'));
    console.log('Dialog closed on Escape:', !stillVisible);

    const draft = await page.evaluate(() => sessionStorage.getItem('memorijal_modal_draft'));
    console.log('Saved Draft Content:', draft);
  }

  await browser.close();
}

testModal().catch(console.error);

