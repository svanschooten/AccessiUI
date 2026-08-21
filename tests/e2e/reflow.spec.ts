import { expect, test } from '@playwright/test';

/**
 * Reflow and scaling — WCAG 2.2 SC 1.4.10 and 1.4.4, plan sections 8.5, 23.7.
 *
 * A character sheet that looks excellent at 100% can become unusable at 200%.
 * These are the assertions that catch it.
 */
test.describe('reflow and scaling', () => {
  const noHorizontalScroll = async (page: import('@playwright/test').Page) =>
    page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

  test('no horizontal scrolling at 320px (SC 1.4.10)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto('/');
    expect(await noHorizontalScroll(page), 'page scrolls sideways at 320px').toBe(true);
  });

  test('no horizontal scrolling at 200% text scale', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 320, height: 640 });
    // Root font size is what browser text-scaling settings actually change.
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    expect(await noHorizontalScroll(page), 'page scrolls sideways at 200% text').toBe(true);
  });

  test('hit point value stays visible at 400% text scale', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 320, height: 640 });
    await page.addStyleTag({ content: 'html { font-size: 400%; }' });

    // Fixed-height containers clip text at high scale; this catches that.
    const heading = page.getByRole('heading', { name: 'Hit points' });
    await expect(heading).toBeVisible();

    const clipped = await heading.evaluate((el) => el.scrollHeight > el.clientHeight + 2);
    expect(clipped, 'heading text is clipped by its container').toBe(false);
  });

  test('increased text scale enlarges controls with it', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Damage 5 hit points' });
    const before = await button.boundingBox();

    await page.addStyleTag({ content: ':root { --a11y-font-scale: 2; }' });
    const after = await button.boundingBox();

    // Proves the component reads the token rather than hard-coding a size —
    // the mechanism the whole profile system depends on.
    expect(after!.height, 'control did not grow with the font scale token').toBeGreaterThan(
      before!.height,
    );
  });
})
