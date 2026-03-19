import { test } from '@playwright/test';
import { validateLocators } from './pages/validateLocators';
import loginData from './test-data/loginTestData.json';


test.only('Validate user can locate elements using playwright locators ', async ({ page }) => {

  const objValidateLocatorsPage = new validateLocators(page);
  await objValidateLocatorsPage.open(loginData.environMent.production.angularpracticeUrl);
  await objValidateLocatorsPage.validateLocators();

});