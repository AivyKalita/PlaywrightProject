class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.confirmationHeading = page.getByRole('heading', {
      name: 'Thank you for your order!',
    });
    this.confirmationMessage = page.getByText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
  }
}

module.exports = { CheckoutCompletePage };
