import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";



test('Verify the page has been loaded successfully and validate the title', async ({page})=> {

  //Mentioned Selectors 
  const usernameField = '#userEmail';
  const passwordField = '#userPassword';
  const loginButton = '#login';
  const url = 'https://rahulshettyacademy.com/client';
  const titleText = "Let's Shop";
  const dashboardTitleText = '//*[text()="Automation Practice"]';


  //Called in the functions and perform actions
  await page.goto(url);
  const title = await expect(page).toHaveTitle(titleText);
  console.log(title);
  await page.locator(usernameField).fill('xyz1024@gmail.com')
  await page.locator(passwordField).fill('9Q944hY$#wAnkuM');
  await page.locator(loginButton).click();
  await expect(page.locator(dashboardTitleText)).toBeVisible();

});

test('Verify the windows handlinig', async ({browser})=> 
  {  
    const context = await browser.newContext();
    const page = await context.newPage();
    const url = "https://the-internet.herokuapp.com/windows";
    const linkSelector = "[href*='windows']";
    const newPageText = "div[class='example'] h3";
    const titleText = "New Window";

    await page.goto(url);
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click(linkSelector),
    ])

    const veriifyText = await newPage.locator(newPageText).textContent();
    console.log(veriifyText);
    await expect(newPage.locator(newPageText)).toHaveText(titleText);

  });

