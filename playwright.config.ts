import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // test suite level
  testDir: './tests',
  reporter: 'html',
  fullyParallel: true,
  // workers: 2,
  // retries: 2,
  // maxFailures: 5,

  // nested - typically effect individual tests not the entire suite
  // expect: {
  //   timeout: 5000,
  // },

  use: { // applied to all tests, except where overridden at the test or group level
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    headless: false,
    launchOptions: { slowMo: 1000 },
  },

  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000/',
    reuseExistingServer: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    // tests limited to a particular directory
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testDir: './tests/mobile',
    },
    // by purpose, filtering test to a regex
    {
      name: 'Smoke',
      testMatch: /.*smoke.test.ts/,
      retries: 0,
    },
    // Opposite of testMatch, filtering out tests by regex
    {
      name: 'Regular',
      testIgnore: /.*smoke.test.ts/,
      retries: 2,
      use: {
        // ..
      }
    }
  ]
});