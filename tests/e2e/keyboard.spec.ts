import { expect, test } from '@playwright/test';

/**
 * Keyboard-only operation — plan section 21.4.
 *
 * Every interaction must be possible without a mouse or touch. This walks the
 * real Phase 1 tasks rather than asserting that focus rings exist somewhere.
 */
test.describe('keyboard only', () => {
  test.beforeEach(async ({ page }) => await page.goto('/'));

  test('every interactive control is reachable by Tab', async ({ page }) => {
    const controls = await page.locator('button:visible, input:visible').count();

    const reached = new Set<string>();
    for (let i = 0; i < controls + 5; i++) {
      await page.keyboard.press('Tab');
      const id = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        return el.getAttribute('aria-label') ?? el.textContent?.trim() ?? el.tagName;
      });
      if (id) reached.add(id);
    }

    expect(reached.size, `only reached ${reached.size} of ${controls} controls`).toBeGreaterThanOrEqual(controls);
  });

  test('hit points can be changed and undone by keyboard alone', async ({ page }) => {
    await page.getByRole('button', { name: 'Damage 5 hit points' }).focus();
    await page.keyboard.press('Enter');

    await expect(page.getByText('29', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('−5 → 29 HP')).toBeVisible();

    const undo = page.getByRole('button', { name: 'Undo' });
    await undo.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText('−5 → 29 HP')).toBeHidden();
  });

  test('space activates a stepper, as a native button should', async ({ page }) => {
    await page.getByRole('button', { name: 'Heal 5 hit points' }).focus();
    await page.keyboard.press(' ');
    await expect(page.getByText('+5 → 39 HP')).toBeVisible();
  });

  test('a skill can be rolled and its result read by keyboard alone', async ({ page }) => {
    await page.getByRole('button', { name: 'Roll Perception check' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.skill__result')).toHaveText(/Perception check: d20 \d+ \+ 5 = \d+/);
  });

  test('focus is visible on every control', async ({ page }) => {
    const buttons = page.locator('button:visible');

    for (let i = 0; i < (await buttons.count()); i++) {
      const button = buttons.nth(i);
      await button.focus();

      const outlineWidth = await button.evaluate((el) =>
        parseFloat(getComputedStyle(el).outlineWidth),
      );
      const name = (await button.getAttribute('aria-label')) ?? (await button.textContent());
      // SC 2.4.13 wants a perceivable indicator; our token sets 3px.
      expect(outlineWidth, `no visible focus indicator on "${name?.trim()}"`).toBeGreaterThanOrEqual(2);
    }
  });
});
