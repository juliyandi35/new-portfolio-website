import { test, expect } from '@playwright/test';

test('homepage loads, nav works, atlas search filters, contact link present', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');
  await expect(page.locator('#hero')).toBeVisible();

  await page.locator('a[href="#work"]').first().click();
  await expect(page.locator('#work')).toBeInViewport({ timeout: 5000 });

  await page.locator('#atlas input[type="search"]').fill('arima');
  await expect(page.locator('#atlas')).toContainText('repositories');

  await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(1);

  expect(errors, `console errors: ${errors.join('\n')}`).toEqual([]);
});
