import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',

  fullyParallel: true,
  workers: 2,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /tests\/.*\.spec\.ts/,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /tests\/.*\.spec\.ts/,
    },
    {
  name: 'api',
  testMatch: /Api-tests\/.*\.spec\.ts/,
}
  ],
});
