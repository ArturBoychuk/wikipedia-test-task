import { Page, Locator, expect } from '@playwright/test'

export class LoginPage {
  private readonly page: Page
  private readonly form: Locator
  private readonly userName: string
  private readonly password: string

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('#userloginForm')
    this.userName = process.env.USER_NAME || ''
    this.password = process.env.PASSWORD || ''
  }

  async navigateToLogin() {
    await this.page.goto('')
    await this.page.click('#pt-login-2')
  }

  async login() {
    const userNameInput = this.form.locator('#wpName1')
    userNameInput.pressSequentially(this.userName)
    await expect(userNameInput).toHaveValue(this.userName)

    const passwordInput = this.form.locator('#wpPassword1')
    passwordInput.pressSequentially(this.password)
    await expect(passwordInput).toHaveValue(this.password)

    await this.form.locator('#wpLoginAttempt').click()

    this.page.on('response', async (response) => {
      const url = response.url()
      const status = response.status()

      const isCentralLogin = url.includes('CentralLogin/complete')
      const isWikiMainPage = url.includes('wiki/Main_Page')

      isCentralLogin || isWikiMainPage
        ? expect(status).toBe(200)
        : null
    })

    await this.page.waitForLoadState('networkidle')

    const cookies = await this.page.context().cookies()
    const userNameCookie = cookies.find(cookie => cookie.name === 'enwikiUserName')
    expect(userNameCookie).toBeDefined()
    expect(userNameCookie?.value).toBe(this.userName)
  }
}
