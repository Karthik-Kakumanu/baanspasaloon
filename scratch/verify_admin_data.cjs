const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox'] 
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });

  // Try saving an appointment directly via page.evaluate to test localStorage + Admin Dashboard sync
  await page.evaluate(() => {
    const demoAppt = {
      id: 'test-uuid-1',
      name: 'Priya Patel',
      phone: '+91 99887 76655',
      service: 'signature-balinese-massage',
      serviceName: 'Signature Balinese Massage',
      location: 'BAAN Flagship Indira Nagar',
      date: '2026-11-25',
      time: '11:00 AM',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('baan_appointments', JSON.stringify([demoAppt]));
  });

  const checkAppt = await page.evaluate(() => localStorage.getItem('baan_appointments'));
  console.log('Appt saved directly to localStorage:', checkAppt ? 'SUCCESS' : 'FAILURE');

  // Now go to admin and verify it renders
  await page.goto('http://localhost:5174/admin/login', { waitUntil: 'networkidle0' });
  const loginSubmit = await page.$('form button[type="submit"]');
  if (loginSubmit) {
    await loginSubmit.click();
    await new Promise(r => setTimeout(r, 1200));
  }
  console.log('Admin Current URL:', page.url());

  const apptRows = await page.$$('table tbody tr');
  console.log('Admin Dashboard Table Rows displayed:', apptRows.length);

  // Read first row text
  if (apptRows.length > 0) {
    const text = await page.evaluate(el => el.textContent, apptRows[0]);
    console.log('First appointment row text:', text);
  }

  await browser.close();
})();

