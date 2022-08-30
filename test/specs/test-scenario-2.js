const homePage = require("../../app/page-objects/home-page.js");
const loginPage = require("../../app/page-objects/login-page.js");
const itemPage = require("../../app/page-objects/item-page.js");
const cartPage = require("../../app/page-objects/cart-page.js");
const checkoutPage = require("../../app/page-objects/checkout-page.js");
const successfulCheckoutPage = require("../../app/page-objects/successful-checkout-page.js");
const orderHistoryPage = require("../../app/page-objects/order-history-page.js");
const orderDetailsPage = require("../../app/page-objects/order-details-page.js");
const { user } = require("../../app/business-objects/data-for-tests.js");
const { coupons } = require("../../app/business-objects/data-for-tests.js");
const { testDataForScenario2 } = require("../../app/business-objects/data-for-tests.js");

describe("On Awesome-shop", () => {
  it("user could log in and complete a checkout with a coupon", async () => {
    await homePage.open();
    await homePage.goToLoginPage();
    await loginPage.login(user);
    await loginPage.goToDefaultPage();
    await homePage.clickIPhoneItem();
    await itemPage.selectQuantityOfItems(testDataForScenario2);
    await itemPage.clickOnAddToCartButton();
    await itemPage.goToCartPage();
    await cartPage.applyCoupon(coupons);
    await expect(cartPage.appliedCouponAlert).toBeExisting();
    await expect(cartPage.appliedCouponAlert).toHaveTextContaining("Success: Your coupon discount has been applied!");

    await expect(cartPage.subTotalLine).toBeExisting();
    const subTotalText = await cartPage.getTextFromSubTotal();
    const subTotalPrice = Number(subTotalText.slice(11, subTotalText.length).replace(",", ""));
    const discountToBe = -((subTotalPrice * 15) / 100);

    await expect(cartPage.discountLine).toBeExisting();
    const discountText = await cartPage.getTextFromDiscountLine();
    const discountPrice = Number(discountText.slice(21, discountText.length));

    expect(discountPrice).toEqual(discountToBe);

    await cartPage.goToCheckoutPage();
    await checkoutPage.addNewBillingAddress(user);
    await checkoutPage.useExistingDeliveryAddress();
    await checkoutPage.addDeliveryMethod(testDataForScenario2);
    await checkoutPage.addPaymentMethod();
    await checkoutPage.confirmPaymentMethod();
    await checkoutPage.confirmOrder();

    await expect(successfulCheckoutPage.messageTitle).toBeExisting();
    await expect(successfulCheckoutPage.messageTitle).toHaveTextContaining("Your order has been placed!");

    await successfulCheckoutPage.goToOrderHistoryPage();
    await orderHistoryPage.clickOnFirstViewButton();
    await expect(orderDetailsPage.orderedItem).toBeExisting();
  });
});
