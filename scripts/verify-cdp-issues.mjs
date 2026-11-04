import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testCspIssues() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  
  // Enable Audits / Issues domain
  await client.send('Audits.enable');
  
  const issues = [];
  client.on('Audits.issueAdded', issue => {
    issues.push(issue);
  });

  const consoleMsgs = [];
  page.on('console', msg => consoleMsgs.push({ type: msg.type(), text: msg.text() }));

  const routes = ['/en/', '/ru/', '/mne/', '/ru/pricing-breakdown/'];
  for (const r of routes) {
    await page.goto('http://localhost:4173' + r, { waitUntil: 'networkidle0' });
  }

  await browser.close();

  console.log('=== CDP AUDIT & DEVTOOLS ISSUES VERIFICATION ===');
  console.log('Total DevTools Issues reported:', issues.length);
  if (issues.length > 0) {
    console.log('Issues details:', JSON.stringify(issues, null, 2));
  }
  const cspIssues = issues.filter(i => i.issue?.code === 'ContentSecurityPolicyIssue');
  console.log('CSP Issues:', cspIssues.length);
  console.log('Console Errors/Warnings:', consoleMsgs.filter(m => ['error', 'warning'].includes(m.type)));
}

testCspIssues().catch(console.error);

