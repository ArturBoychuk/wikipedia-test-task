import { test as setup } from '@playwright/test'
import { PageManager } from '../../helpers/PageManager'

const authFile = '.auth/user.json'

setup('authentication', async ({ page }) => {
  const pageManager = new PageManager(page)
  const loginPage = pageManager.getLoginPage()

  await loginPage.navigateToLogin()
  await loginPage.login()

  await page.context().storageState({ path: authFile })
})  
