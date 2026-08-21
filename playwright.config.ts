import { defineConfig, devices } from '@playwright/test';

/**
 * Browser tier — plan sections 21.2, 22.2.
 *
 * These tests exist because jsdom has no layout engine: `getBoundingClientRect`
 * returns zeros there, so target size, reflow, and focus visibility cannot be
 * asserted in the unit tier. Those are exactly the properties that fail
 * silently — the source keeps saying `min-height: var(--a11y-target-size)`
 * while the rendered control is 20px tall.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },

  projects: [
    {
      // The primary use case: a phone held in a hand during a game.
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    // Serve only. The build runs as its own step (see the `test:e2e` script and
    // the CI workflow) so a build failure reports as a build failure instead of
    // hiding behind a webServer timeout two minutes later.
    //
    // The host is pinned to 127.0.0.1 rather than left as `localhost`: on CI
    // runners `localhost` can resolve to ::1 first, leaving Vite bound to IPv6
    // while Playwright polls IPv4 until it gives up.
    command: 'npm run preview --workspace @accessible-dnd/character-sheet',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
