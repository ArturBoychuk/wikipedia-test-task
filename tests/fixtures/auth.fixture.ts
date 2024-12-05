import { test as base, Page } from '@playwright/test'

export const test = base.extend<{ authorizedPage: Page }>({
  authorizedPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: '.auth/user.json' })
    const page = await context.newPage()
    await use(page)
    await context.close()
  },
})
