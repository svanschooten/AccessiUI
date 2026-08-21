import { expect, test } from '@playwright/test';

/**
 * Rendered target size — WCAG 2.2 SC 2.5.8, plan section 8.3.
 *
 * The unit tier checks that `--a11y-target-size` is 44px in the token file.
 * That is not the same claim as this one. A build that tree-shakes the token,
 * a component that forgets to reference it, or a layout that squashes a
 * control all leave the token correct and the rendered control too small.
 * This measures the actual box.
 */
test.describe('target size', () => {
  test.beforeEach(async ({ page }) => await page.goto('/'));

  test('every interactive control meets the 44px design target', async ({ page }) => {
    const controls = page.locator('button, input, select, a[href]');
    const count = await controls.count();
    expect(count, 'expected interactive controls on the page').toBeGreaterThan(0);

    const undersized: string[] = [];
    for (let i = 0; i < count; i++) {
      const control = controls.nth(i);
      if (!(await control.isVisible())) continue;

      const box = await control.boundingBox();
      if (!box) continue;

      if (box.width < 44 || box.height < 44) {
        const name =
          (await control.getAttribute('aria-label')) ?? (await control.textContent()) ?? '<unnamed>';
        undersized.push(`${name.trim()} — ${Math.round(box.width)}x${Math.round(box.height)}`);
      }
    }

    expect(undersized, `controls below the 44px target:\n${undersized.join('\n')}`).toEqual([]);
  });

  test('controls clear the WCAG floor of 24px even at the smallest viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });

    const buttons = page.locator('button');
    for (let i = 0; i < (await buttons.count()); i++) {
      const box = await buttons.nth(i).boundingBox();
      if (!box) continue;
      expect(box.height, `button ${i} is ${box.height}px tall`).toBeGreaterThanOrEqual(24);
    }
  });

  test('adjacent hit point steppers do not overlap', async ({ page }) => {
    const damage5 = page.getByRole('button', { name: 'Damage 5 hit points' });
    const damage1 = page.getByRole('button', { name: 'Damage 1 hit points' });

    const a = await damage5.boundingBox();
    const b = await damage1.boundingBox();
    expect(a).not.toBeNull();
    expect(b).not.toBeNull();

    const overlaps = a!.x < b!.x + b!.width && b!.x < a!.x + a!.width;
    expect(overlaps, 'adjacent damage steppers overlap').toBe(false);
  });
});
