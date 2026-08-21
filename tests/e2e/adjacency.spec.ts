import { expect, test } from '@playwright/test';

/**
 * Feedback adjacency — plan section 8.8.
 *
 * Screen magnifier software does not reflow the page; the user pans a small
 * window over it and may see a fifth of the screen. Feedback rendered far from
 * the control that caused it is invisible to them: they press Roll and nothing
 * appears to happen.
 *
 * We approximate the magnified viewport as a 300x300 CSS-pixel window centred
 * on the control, and require the feedback to fall inside it.
 */
const MAGNIFIED_WINDOW = 300;

test.describe('feedback adjacency', () => {
  test.beforeEach(async ({ page }) => await page.goto('/'));

  test('a roll result appears within a magnified viewport of its button', async ({ page }) => {
    const rollButton = page.getByRole('button', { name: 'Roll Perception check' });
    await rollButton.click();

    const button = await rollButton.boundingBox();
    const result = await page.locator('.skill__result').boundingBox();

    expect(result, 'roll result did not render').not.toBeNull();

    const distance = Math.hypot(
      result!.x + result!.width / 2 - (button!.x + button!.width / 2),
      result!.y + result!.height / 2 - (button!.y + button!.height / 2),
    );

    expect(
      distance,
      `roll result is ${Math.round(distance)}px from its button; a magnifier user would not see it`,
    ).toBeLessThan(MAGNIFIED_WINDOW);
  });

  test('hit point change feedback appears next to the steppers', async ({ page }) => {
    const damage = page.getByRole('button', { name: 'Damage 5 hit points' });
    await damage.click();

    const button = await damage.boundingBox();
    const feedback = await page.getByText('−5 → 29 HP').boundingBox();

    const distance = Math.hypot(
      feedback!.x + feedback!.width / 2 - (button!.x + button!.width / 2),
      feedback!.y + feedback!.height / 2 - (button!.y + button!.height / 2),
    );

    expect(distance, `change feedback is ${Math.round(distance)}px from the stepper`).toBeLessThan(
      MAGNIFIED_WINDOW,
    );
  });

  test('the roll result is real text, not only a live region', async ({ page }) => {
    await page.getByRole('button', { name: 'Roll Perception check' }).click();

    // The text appears twice by design: visibly next to the button, and in a
    // live region for screen readers. Assert both — a result that exists only
    // in the live region fails every sighted user, magnifier or not.
    await expect(page.locator('.skill__result')).toBeVisible();
    await expect(page.locator('.skill__result')).toHaveText(/Perception check: d20/);
    await expect(page.getByRole('status')).toHaveText(/Perception check: d20/);
  });
});
