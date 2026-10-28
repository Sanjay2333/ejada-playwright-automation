
import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  get firstName() {
    return this.page.getByPlaceholder('First Name');
  }

  get lastName() {
    return this.page.getByPlaceholder('Last Name');
  }

  get postalCode() {
    return this.page.getByPlaceholder('Zip/Postal Code');
  }

  get continueButton() {
    return this.page.getByRole('button', {
      name: 'Continue',
    });
  }

  get finishButton() {
    return this.page.getByRole('button', {
      name: 'Finish',
    });
  }

  get confirmationMessage() {
    return this.page.getByText('Thank you for your order!');
  }

  async enterCustomerDetails() {
    await this.firstName.fill('Sanjay');
    await this.lastName.fill('Kumar');
    await this.postalCode.fill('600001');
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}
