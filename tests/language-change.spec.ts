import { test } from './fixtures/auth.fixture'
import { PageManager } from '../helpers/PageManager'
import { Language } from '../page-objects/PreferencesPage'

test('Successful language change in Wikipedia by an authorized user', async ({ authorizedPage }) => {
  const pageManager = new PageManager(authorizedPage)
  const preferencesPage = pageManager.getPreferencesPage()

  const ukranianLanguage: Language = {
    code: 'uk',
    autonym: 'українська',
    pageTitle: 'Налаштування'
  }

  await preferencesPage.navigateToPreferences()
  await preferencesPage.verifyDefaultTabSelected()
  await preferencesPage.verifyDefaultLanguageChosen()
  await preferencesPage.changeLanguageTo(ukranianLanguage)
  await preferencesPage.savePreferences(ukranianLanguage)
  await preferencesPage.verifyLanguageInLocalStorage(ukranianLanguage)
});

test.afterEach(async ({ authorizedPage }) => {  
  const pageManager = new PageManager(authorizedPage)
  const preferencesPage = pageManager.getPreferencesPage()
  
  const englishLanguage: Language = {
    code: 'en',
    autonym: 'English',
    pageTitle: 'Preferences'
  }

  await preferencesPage.changeLanguageTo(englishLanguage)
  await preferencesPage.savePreferences(englishLanguage)
  await preferencesPage.verifyLanguageInLocalStorage(englishLanguage)
})
