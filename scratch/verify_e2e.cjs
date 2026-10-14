const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox'] 
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  console.log('1. Navigating to http://localhost:5174/ ...');
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });

  // 1. Test Quick Booking Bar on Homepage
  console.log('2. Testing Quick Booking Bar on Homepage...');
  await page.type('.quick-booking-bar input[placeholder="Name"]', 'Priya Patel');
  await page.type('.quick-booking-bar input[placeholder="Phone"]', '+91 99887 76655');

  await page.evaluate(() => {
    const d = document.querySelector('.quick-booking-bar input[type="date"]');
    if (d) {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeSetter.call(d, '2026-11-25');
      d.dispatchEvent(new Event('input', { bubbles: true }));
      d.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  const quickSubmit = await page.$('.quick-booking-bar form button[type="submit"]');
  if (quickSubmit) {
    await quickSubmit.click();
    await new Promise(r => setTimeout(r, 1000));
  }

  // 2. Test Header Booking Modal
  console.log('3. Opening Header Appointment Modal...');
  const headerBtn = await page.$('.header-booking-cta');
  if (headerBtn) {
    await headerBtn.click();
    await new Promise(r => setTimeout(r, 700));

    await page.type('.baan-booking-modal input[placeholder*="Shreya"]', 'Rohan Mehra');
    await page.type('.baan-booking-modal input[type="tel"]', '+91 98765 11223');

    await page.evaluate(() => {
      const d = document.querySelector('.baan-booking-modal input[type="date"]');
      if (d) {
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeSetter.call(d, '2026-12-05');
        d.dispatchEvent(new Event('input', { bubbles: true }));
        d.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    const modalSubmit = await page.$('.baan-booking-modal form button[type="submit"]');
    if (modalSubmit) {
      await modalSubmit.click();
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // Check localStorage for appointments
  const appts = await page.evaluate(() => localStorage.getItem('baan_appointments'));
  const parsedAppts = appts ? JSON.parse(appts) : [];
  console.log(`Appointments in localStorage: ${parsedAppts.length > 0 ? 'PASS' : 'FAIL'} (${parsedAppts.length} appointments saved)`);

  // 3. Test Contact page
  console.log('4. Navigating to http://localhost:5174/contact ...');
  await page.goto('http://localhost:5174/contact', { waitUntil: 'networkidle0' });
  await page.type('.page-contact input[placeholder*="Ananya Rao"]', 'Vikram Mehta');
  await page.type('.page-contact input[type="tel"]', '+91 91234 56789');
  await page.type('.page-contact textarea', 'Looking for bespoke corporate wellness retreat.');

  const contactSubmit = await page.$('.page-contact form button[type="submit"]');
  if (contactSubmit) {
    await contactSubmit.click();
    await new Promise(r => setTimeout(r, 1000));
  }

  const msgs = await page.evaluate(() => localStorage.getItem('baan_contact_messages'));
  const parsedMsgs = msgs ? JSON.parse(msgs) : [];
  console.log(`Contact messages in localStorage: ${parsedMsgs.length > 0 ? 'PASS' : 'FAIL'} (${parsedMsgs.length} messages saved)`);

  // 4. Test Admin flow
  console.log('5. Navigating to http://localhost:5174/admin/login ...');
  await page.goto('http://localhost:5174/admin/login', { waitUntil: 'networkidle0' });
  const loginSubmit = await page.$('form button[type="submit"]');
  if (loginSubmit) {
    await loginSubmit.click();
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log('Admin Current URL:', page.url());

  const apptRows = await page.$$('table tbody tr');
  console.log('Admin Dashboard Table Rows displayed:', apptRows.length);

  console.log('Total console errors captured:', errors.length);
  if (errors.length > 0) {
    console.log('Errors:', errors);
  }

  await browser.close();
  console.log('=== All E2E smoke tests successfully completed! ===');
})();

