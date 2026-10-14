const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox'] 
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });

  await page.type('.quick-booking-bar input[placeholder="Name"]', 'Kavita Roy');
  await page.type('.quick-booking-bar input[placeholder="Phone"]', '+91 98888 77777');

  await page.evaluate(() => {
    const d = document.querySelector('.quick-booking-bar input[type="date"]');
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeSetter.call(d, '2026-12-20');
    d.dispatchEvent(new Event('input', { bubbles: true }));
    d.dispatchEvent(new Event('change', { bubbles: true }));
  });

  const submit = await page.$('.quick-booking-bar form button[type="submit"]');
  await submit.click();
  await new Promise(r => setTimeout(r, 1000));

  const appts = await page.evaluate(() => localStorage.getItem('baan_appointments'));
  console.log('Appts after form submit:', appts);
  await browser.close();
})();
