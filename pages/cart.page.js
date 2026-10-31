class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async expectProduct(productName) {
    await this.page.getByText(productName, { exact: true }).waitFor();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
