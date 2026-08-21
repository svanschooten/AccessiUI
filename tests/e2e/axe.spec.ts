import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * Automated rule scanning — plan section 21.1.
 *
 * Necessary but nowhere near sufficient. Automated tooling catches a minority
 * of accessibility problems: it can see a missing accessible name, but not
 * whether the name is useful, whether the reading order makes sense, or
 * whether a magnifier user can find the feedback. The other specs in this
 * directory, and the manual tier, carry the rest.
 */
const scan = (page: import('@playwright/test').Page) =>
  new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']);

test.describe('axe', () => {
  test('the character sheet has no violations at rest', async ({ page }) => {
    await page.goto('/');
    const { violations } = await scan(page).analyze();
    expect(
      violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`),
      'axe violations',
    ).toEqual([]);
  });

  test('no violations after a roll and a hit point change', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Roll Perception check' }).click();
    await page.getByRole('button', { name: 'Damage 5 hit points' }).click();

    // State changes are where dynamic content usually breaks semantics.
    const { violations } = await scan(page).analyze();
    expect(violations.map((v) => `${v.id}: ${v.help}`), 'axe violations after interaction').toEqual(
      [],
    );
  });

  test('no violations at 200% text scale', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto('/');
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });

    const { violations } = await scan(page).analyze();
    expect(violations.map((v) => `${v.id}: ${v.help}`), 'axe violations at 200%').toEqual([]);
  });
});
