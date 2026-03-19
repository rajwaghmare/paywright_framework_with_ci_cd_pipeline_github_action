import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";

test('Validate Login Functionality with valid credentials', async ({page})=> {

  //Mentioned Selectors 
  const usernameField = '#userEmail';
  const passwordField = '#userPassword';
  const loginButton = '#login';
  const url = 'https://rahulshettyacademy.com/client/#/auth/login';
  const titleText = "Let's Shop";
//   const errorMessage = "[class*='flyInOut'] div[class='alert alert-danger col-md-12']";
//   const expectedErrorText = "Incorrect email or password.";
  const userId = 'xyz1024@gmail.com';
  const password = '9Q944hY$#wAnkuM';

    //Called in the functions and perform actions
    await page.goto(url);
    console.log('Viewport:', page.viewportSize());
    const title = await expect(page).toHaveTitle(titleText);
    console.log(title);
    await page.locator(usernameField).fill(userId)
    await page.locator(passwordField).fill(password);
    await page.locator(loginButton).click();
//     const errorText = await page.locator(errorMessage).textContent();
//     console.log(errorText);
//     expect(errorText).toBe(expectedErrorText);
  
});

test('Validate Login Functionality with invalid credentials', async ({page})=> {
    //Mentioned Selectors
    const usernameField = '#userEmail';
    const passwordField = '#userPassword';
    const loginButton = '#login';
    const url = 'https://rahulshettyacademy.com/client/#/auth/login';
    const titleText = "Let's Shop";
    const errorMessage = "[class*='flyInOut'] div[class='alert alert-danger col-md-12']";
    const expectedErrorText = "Incorrect email or password.";
    const invalidUserId = 'invaliduser@example.com';
    const invalidPassword = 'InvalidPassword123';

    await page.goto(url);
    const title = await expect(page).toHaveTitle(titleText);
    console.log(title);
    await page.locator(usernameField).fill(invalidUserId);
    await page.locator(passwordField).fill(invalidPassword);
    await page.locator(loginButton).click();
    const errorText = await page.locator(errorMessage).textContent();
    console.log(errorText);
    expect(errorText).toBe(expectedErrorText);

});