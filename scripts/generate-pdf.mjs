import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox']
});

const page = await browser.newPage();
await page.goto('file:///Users/azamkhan/the-guided-path/public/guides/architecture-of-guidance.html', {
  waitUntil: 'networkidle0',
  timeout: 30000
});

await page.pdf({
  path: '/Users/azamkhan/the-guided-path/public/guides/architecture-of-guidance.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '0', bottom: '0', left: '0', right: '0' }
});

await browser.close();
console.log('PDF generated successfully');
