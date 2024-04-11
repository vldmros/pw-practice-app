import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  // timeout: 40000,
  // globalTimeout: 60000,

  expect: {
    timeout: 2000,
    toMatchSnapshot: {maxDiffPixels: 50}
  },
  retries: 1,
  reporter: [
    ['html'],
    // ['json', { outputFile: 'test-result/jsonReport.json' }],
    // ['junit', {outputFile: 'test-result/jsonReport.xml'}]
    ],   //list
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:4200/',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:DevEnv/'               //DEV=1 npx playwright test autoWaiting.spec.ts --project=chromium
      : process.env.STAGE == '1' ? 'http://localhost:StageEnv/'
      : 'http://localhost:4200/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // video: {
    //   mode: 'on'
    //   size: {width: 1920, height: 1080}
    // }
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'StageEnv',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     headless: false,    
    //     baseURL: 'http://localhost:StageEnv/',         //npx playwright test DragAndDropWithiFrames.spec.ts --project=StageEnv
    //   },
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'pageObjectsFullScreen',                               // npx playwright test --project=pageObjectsFullScreen
      testMatch: 'usePageObjects.spec.ts',
      use: { 
        viewport: { width: 1920, height: 1080 },
        browserName: 'firefox'
       },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: 'testMobole.spec.ts'
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
      testMatch: 'testMobole.spec.ts'
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
