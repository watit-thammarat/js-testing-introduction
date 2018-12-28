const pupeteer = require('puppeteer');

const { generateText, checkAndGenerate } = require('./util');

test('Should output name and age', () => {
  let text = generateText('watit', 20);
  expect(text).toBe('watit (20 years old)');

  text = generateText('test', 28);
  expect(text).toBe('test (28 years old)');
});

test('Should output data-less text', () => {
  const text = generateText();
  expect(text).toBe('undefined (undefined years old)');
});

test('Should generate a valid text output', () => {
  const text = checkAndGenerate('watit', 20);
  expect(text).toBe('watit (20 years old)');
});

test('should create eleement with text and correct class', async () => {
  const browser = await pupeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/index.html');
  await page.click('input#name');
  await page.type('input#name', 'Anna');
  await page.click('input#age');
  await page.type('input#age', '28');
  await page.click('#btnAddUser');
  const text = await page.$eval('.user-item', el => el.textContent);
  expect(text).toBe('Anna (28 years old)');
}, 10000);
