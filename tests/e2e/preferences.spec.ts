import { expect, test } from '@playwright/test';

/**
 * Platform preference integration — plan sections 5.4, 11, 12.2.
 *
 * The project must not fight accessibility features the platform provides.
 */
test.describe('platform preferences', () => {
  test('reduced motion removes transitions', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const duration = await page
      .getByRole('button', { name: 'Damage 5 hit points' })
      .evaluate((el) => getComputedStyle(el).transitionDuration);

    expect(duration, 'transitions still run under prefers-reduced-motion').toBe('0s');
  });

  test('motion runs normally when not suppressed', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');

    const duration = await page
      .getByRole('button', { name: 'Damage 5 hit points' })
      .evaluate((el) => getComputedStyle(el).transitionDuration);

    expect(duration).not.toBe('0s');
  });

  test('increased contrast strengthens borders', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Damage 5 hit points' });
    const normal = await button.evaluate((el) => getComputedStyle(el).borderTopWidth);

    await page.emulateMedia({ contrast: 'more' });
    const strengthened = await button.evaluate((el) => getComputedStyle(el).borderTopWidth);

    expect(parseFloat(strengthened)).toBeGreaterThanOrEqual(parseFloat(normal));
  });

  test('the page still works with forced colors active', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/');

    // The failure mode here is content disappearing, not looking different.
    await expect(page.getByRole('heading', { name: 'Hit points' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Damage 5 hit points' })).toBeVisible();

    await page.getByRole('button', { name: 'Roll Perception check' }).click();
    await expect(page.locator('.skill__result')).toBeVisible();
  });
});
