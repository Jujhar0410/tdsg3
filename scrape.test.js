const { test, expect } = require('@playwright/test');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=63',
  'https://sanand0.github.io/tdsdata/js_table/?seed=64',
  'https://sanand0.github.io/tdsdata/js_table/?seed=65',
  'https://sanand0.github.io/tdsdata/js_table/?seed=66',
  'https://sanand0.github.io/tdsdata/js_table/?seed=67',
  'https://sanand0.github.io/tdsdata/js_table/?seed=68',
  'https://sanand0.github.io/tdsdata/js_table/?seed=69',
  'https://sanand0.github.io/tdsdata/js_table/?seed=70',
  'https://sanand0.github.io/tdsdata/js_table/?seed=71',
  'https://sanand0.github.io/tdsdata/js_table/?seed=72'
];

test('Scrape and sum all table numbers', async ({ page }) => {
  let totalSum = 0;

  for (const url of urls) {
    await page.goto(url);
    await page.waitForLoadState('networkidle');  // Wait for dynamic tables to load

    // Find all table cells and extract numbers
    const numbers = await page.$$eval('table td, table th', elements =>
      elements
        .map(el => el.textContent)
        .map(text => parseFloat(text))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
    console.log(`Sum for ${url}: ${pageSum}`);
  }

  console.log(`GRAND TOTAL SUM OF ALL TABLES: ${totalSum}`);
});
