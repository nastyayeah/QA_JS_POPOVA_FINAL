import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './ui/tests',
  retries: 1,
  timeout: 60000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    baseURL: process.env.BASE_URL_UI,
  },
  reporter: [['html', { open: 'never' }]],
})