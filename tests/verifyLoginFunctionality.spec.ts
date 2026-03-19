import { test } from '@playwright/test';
import { loginPage } from '../tests/pages/loginPage';
import loginData from '../tests/test-data/loginTestData.json';


test('Validate user can login successfully and add product ', async ({ page }) => {

  const objLoginPage = new loginPage(page);
  await objLoginPage.open(loginData.environMent.production.loginUrl);
  await objLoginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );
  await objLoginPage.addToCart();
  await objLoginPage.checkOutProduct();
  await objLoginPage.verifyOrderSuccess();
  
  await page.context().browser()?.close();

});
