import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  get backpack() {
    return this.page.getByRole('button', {
      name: 'Add to cart',
    }).first();
  }

  get cartIcon() {
    return this.page.locator('.shopping_cart_link');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  async addBackpackToCart() {
    await this.page
      .getByRole('button', { name: 'Add to cart' })
      .first()
      .click();
  }

  async openCart() {
    await this.cartIcon.click();
  }
}