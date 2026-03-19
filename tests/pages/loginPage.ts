import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { expect as playwrightExpect } from '@playwright/test';

export class loginPage extends BasePage {
  private username: Locator;
  private password: Locator;
  private loginButton: Locator;
  private cartButton: Locator;
  private checkOutButton: Locator;
  private selectCountryInput: Locator;
  private emailText: Locator;
  private options: Locator;
  private placeOrderButton: Locator;
  private products = this.page.locator('.card-body');
  private productName: string = 'ADIDAS ORIGINAL';
  private titleText: string = "Let's Shop";
  private emailTextValue: string = 'xyz1024@gmail.com';
  private successMessage: string = 'Thankyou for the order.';
  private countryOption: string = 'India';
  

  //Locators initialization
  constructor(page: Page) {
    super(page);
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.loginButton = page.locator('#login');
    this.cartButton = page.locator('.btn.btn-custom[routerlink="/dashboard/cart"]');
    this.checkOutButton = page.locator('li[class="totalRow"] button[type="button"]');
    this.selectCountryInput = page.locator('input[placeholder="Select Country"]');
    this.placeOrderButton = page.locator('button:has-text("Place Order")');
    this.options = page.locator('.ta-results');
    this.emailText = page.locator('label[type="text"]');
    this.placeOrderButton = page.locator('.btnn.action__submit.ng-star-inserted');
    
  }

  async login(user: string, pass: string) {
    
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
    await this.page.locator(`:has-text("${this.productName}")`)
    .first().waitFor({ state: 'visible', timeout: 10000 });
    const title = await this.products.allTextContents();
    console.log(title);
    const count = await this.products.count();
    console.log('Total products are:', count);  
  }

  async addToCart(){
    
    await this.products
    .filter({ hasText: this.productName })
    .locator('button:has-text("Add to Cart")').click(); 
    await this.cartButton.click();
    await this.page.locator('div li').first().waitFor();
    const cartItem = this.page.locator(`h3:has-text("${this.productName}")`);
    await playwrightExpect(cartItem).toBeVisible();
    await this.checkOutButton.click();
  }

  async checkOutProduct(){

    await this.selectCountryInput.pressSequentially('ind');
    const options = this.page.locator('.ta-results');
    await options.waitFor({ state: 'visible', timeout: 1000 });
    const optionsCount = await options.locator('button').count();
    console.log('Total options are:', optionsCount);
    for (let i = 0; i < optionsCount; i++) {
      const optionText = await options.locator('button').nth(i).textContent();
      if (optionText?.trim() === this.countryOption) {
        await options.locator('button').nth(i).click();
        break;
      }
    }

    expect(await this.emailText.textContent()).toContain(this.emailTextValue);
    console.log('"Email text is verified successfully"');
    await this.placeOrderButton.click();
  }

  async verifyOrderSuccess(){

    const thankYouMessage = this.page.locator('.hero-primary');
    await playwrightExpect(thankYouMessage).toHaveText(this.successMessage);
    console.log('"Order success message is verified successfully"');
  }
}
