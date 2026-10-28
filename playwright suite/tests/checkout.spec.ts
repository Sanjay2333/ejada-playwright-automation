import { test, expect } from '@playwright/test';
import { LoginPage } from '../Page Objects/LoginPage';
import { InventoryPage } from '../Page Objects/InventoryPage';
import { CartPage } from '../Page Objects/CartPage';
import { CheckoutPage } from '../Page Objects/CheckoutPage';

test('Complete product checkout successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory.html/);

  // Add one product to the cart
  await inventoryPage.addBackpackToCart();

  await expect(inventoryPage.cartBadge).toHaveText('1');

  // Open cart and verify product
  await inventoryPage.openCart();

  await expect(cartPage.backpackName).toBeVisible();

  // Proceed to checkout
  await cartPage.proceedToCheckout();

  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // Enter customer details
  await checkoutPage.enterCustomerDetails();

  await checkoutPage.continueCheckout();

  await expect(page).toHaveURL(/checkout-step-two\.html/);

  // Finish order
  await checkoutPage.finishOrder();

  // Verify confirmation
  await expect(checkoutPage.confirmationMessage).toBeVisible();
});
