import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { expect as playwrightExpect } from '@playwright/test';

export class validateLocators extends BasePage {
  private name : Locator;
  private email: Locator;
  private password: Locator;
  private checkBox: Locator;
  private gender: Locator;
  private employed: Locator;
  private selectDate: Locator;
  private checkBoxText: string = 'Check me out if you Love IceCreams!';
  private nameText: string = 'TestUser';
  private emailText: string = 'xyz@abc.com';
  private passwordText: string = 'Password123';
  private genderText: string = 'Male';
  private dateText: string = '1990-01-01';
  private alertSuccessText: string = 'Success! The Form has been submitted successfully!';
  

  //Locators initialization
  constructor(page: Page) {
    super(page);
    this.name = page.locator('div[class="form-group"] input[name="name"]');
    this.email = page.locator('div[class="form-group"] input[name="email"]');
    this.password = page.getByPlaceholder('Password');
    this.checkBox = page.getByLabel(this.checkBoxText);
    this.gender = page.getByLabel('Gender');
    this.employed = page.getByLabel('Employed');
    this.selectDate = page.locator('input[name="bday"]');
  }
  
//Method to validate locators and perform actions
  async validateLocators() {
     
    await this.name.fill(this.nameText);
    await this.email.fill(this.emailText);
    await this.password.fill(this.passwordText);
    await this.checkBox.click();
    // await this.gender.waitFor({ state: 'visible', timeout: 5000 });
    await this.gender.selectOption(this.genderText);
    await this.employed.check();
    await this.selectDate.fill(this.dateText);
    await this.page.getByRole('button', { name: 'Submit' }).click();

    const alertText = await this.page.locator('div[class*="alert alert-success"]').textContent();
    console.log('Success Message:', this.alertSuccessText);
    playwrightExpect(alertText).toContain(this.alertSuccessText);
  }

}
