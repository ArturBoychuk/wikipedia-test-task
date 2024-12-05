import { Page } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { PreferencesPage } from '../page-objects/PreferencesPage'

export class PageManager {
    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly preferencesPage: PreferencesPage

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page)
        this.preferencesPage = new PreferencesPage(this.page)
    }

    getLoginPage(): LoginPage {
        return this.loginPage
    }

    getPreferencesPage(): PreferencesPage {
        return this.preferencesPage
    }
}
