import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


require('dotenv').config();

/**
 * RUN THIS CONFIGURATION FILE: npx playwright test --config=playwrite-prod.config.ts
 */
export default defineConfig<TestOptions>({

  use: {

    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: 'http://localhost:4200/',
  },

  projects: [
    {
      name: 'chromium',
    },
  ],
});
