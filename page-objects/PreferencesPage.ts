import { Page, Locator, expect } from '@playwright/test'

export type Language = {
    code: string
    autonym: string
    pageTitle: string
}

export class PreferencesPage {
    private readonly page: Page
    private readonly languageInput: Locator

    constructor(page: Page) {
        this.page = page
        this.languageInput = page.locator('#mw-input-wplanguage')
    }

    async navigateToPreferences() {
        await this.page.goto('')
        await this.page.click('#vector-user-links-dropdown-checkbox')
        await this.page.click('#pt-preferences')
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('#firstHeading')).toHaveText('Preferences')
    }

    async verifyDefaultTabSelected() {
        const tabElement = this.page.locator('[role="tab"]:has(span:has-text("User profile"))')
        await expect(tabElement).toHaveAttribute('aria-selected', 'true')
    }

    async verifyDefaultLanguageChosen() {
        await this.languageInput.waitFor({ state: 'visible' })
        await this.languageInput.scrollIntoViewIfNeeded()
        await expect(this.languageInput.locator('.oo-ui-labelElement-label')).toHaveText('en - English')
    }

    async changeLanguageTo(language: Language) {
        await this.languageInput.click()
        const option = this.page.getByRole('option').locator(`.oo-ui-labelElement-label:has-text("${language.code} - ${language.autonym}")`);
        await option.waitFor({ state: 'visible' })
        await option.scrollIntoViewIfNeeded()
        await option.click();
    }

    async savePreferences(language: Language) {
        await this.page.click('.mw-htmlform-submit-buttons [type="submit"]')
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('#firstHeading')).toHaveText(`${language.pageTitle}`)
    }

    async verifyLanguageInLocalStorage(language: Language) {
        const autonym = await this.page.evaluate(() => localStorage.getItem('uls-previous-language-autonym'))
        const code = await this.page.evaluate(() => localStorage.getItem('uls-previous-language-code'))
        expect(autonym).toBe(language.autonym)
        expect(code).toBe(language.code)
    }
}
