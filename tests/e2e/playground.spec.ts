import { expect, test } from '@playwright/test';

test('loads the manual testing workspace', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Interaction playground' }),
  ).toBeVisible();
});
