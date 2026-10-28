import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get backpackName() {
    return this.page.getByText('Sauce Labs Backpack', {
      exact: true,
    });
  }

  get checkoutButton() {
    return this.page.getByRole('button', {
      name: 'Checkout',
    });
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
