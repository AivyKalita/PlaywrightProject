const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/cart.page');
const { CheckoutCompletePage } = require('../pages/checkout-complete.page');
const { CheckoutPage } = require('../pages/checkout.page');
const { InventoryPage } = require('../pages/inventory.page');
const { LoginPage } = require('../pages/login.page');
const { standardUser } = require('../test-data/credentials');
const { product, customer } = require('../test-data/order');

test('complete a SauceDemo order successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const completePage = new CheckoutCompletePage(page);

  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);
  await expect(page).toHaveURL(/inventory\.html$/);

  await inventoryPage.addToCart(product);
  await inventoryPage.openCart();
  await cartPage.expectProduct(product);
  await cartPage.checkout();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);

  await checkoutPage.enterCustomerInformation(customer);
  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await expect(page.getByText(product, { exact: true })).toBeVisible();
  await checkoutPage.finishOrder();

  await expect(page).toHaveURL(/checkout-complete\.html$/);
  await expect(completePage.confirmationHeading).toBeVisible();
  await expect(completePage.confirmationMessage).toBeVisible();
});
