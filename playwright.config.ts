import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}`;
const webServer = process.env.CI
  ? undefined
  : [
      {
        command: `yarn dev`,
        timeout: 120 * 1000,
        url: baseURL,
        reuseExistingServer: true,
      },
    ];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  webServer,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: 1,
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["line"],
    ["github"],
  ],
  timeout: 5 * 60 * 1000,
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
