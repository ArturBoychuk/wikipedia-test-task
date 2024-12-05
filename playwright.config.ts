import { defineConfig } from '@playwright/test'
require('dotenv').config()

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.BASE_URL,
  },
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
      dependencies: ['setup'],
    },
  ],
  reporter: [
    ['html', { outputFolder: '/wikipedia-test-task/playwright-report', open: 'never' }],
  ],
  workers: 1
})
