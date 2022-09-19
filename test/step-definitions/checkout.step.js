const { Given, When, Then } = require("@wdio/cucumber-framework");
const cartPage = require("../../app/page-objects/cart-page.js");
const checkoutPage = require("../../app/page-objects/checkout-page.js");
const successfulCheckoutPage = require("../../app/page-objects/successful-checkout-page.js");
const orderHistoryPage = require("../../app/page-objects/order-history-page.js");
const orderDetailsPage = require("../../app/page-objects/order-details-page.js");
const { user } = require("../../app/business-objects/data-for-tests.js");
const { testDataForScenario2 } = require("../../app/business-objects/data-for-tests.js");

Then(/^I'm able to complete checkout$/, async () => {
  await cartPage.goToCheckoutPage();
  await checkoutPage.addNewBillingAddress(user);
  await checkoutPage.useExistingDeliveryAddress();
  await checkoutPage.addDeliveryMethod(testDataForScenario2);
  await checkoutPage.addPaymentMethod();
  await checkoutPage.confirmPaymentMethod();
  await checkoutPage.confirmOrder();

  await expect(successfulCheckoutPage.messageTitle).toBeExisting();
  await expect(successfulCheckoutPage.messageTitle).toHaveTextContaining("Your order has been placed!");
});

Then(/^It is present on the order iist$/, async () => {
  await successfulCheckoutPage.goToOrderHistoryPage();
  await orderHistoryPage.clickOnFirstViewButton();
  await expect(orderDetailsPage.orderedItem).toBeExisting();
});
