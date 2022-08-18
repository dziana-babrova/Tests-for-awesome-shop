import homePage from "../../app/page-objects/home-page.js";
import loginPage from "../../app/page-objects/login-page.js";
import itemPage from "../../app/page-objects/item-page.js";
import cartPage from "../../app/page-objects/cart-page.js";
import checkoutPage from "../../app/page-objects/checkout-page.js";
import successfulCheckoutPage from "../../app/page-objects/successful-checkout-page.js";
import orderHistoryPage from "../../app/page-objects/order-history-page.js";
import orderDetailsPage from "../../app/page-objects/order-details-page.js";
import { faker } from "@faker-js/faker";

const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress({ useFullAddress: false }),
  city: faker.address.city(),
  comment: faker.lorem.words(Math.round(Math.random() * (20 - 1) + 1)),
};


describe("On Awesome-shop", () => {
  it("user could log in and complete a checkout with a coupon", async () => {
    await homePage.open();
    await homePage.goToLoginPage();
    await loginPage.login("SarahJasmine@gmail.com", "123Qwer!");
    await loginPage.goToDefaultPage();
    await homePage.clickIPhoneItem();
    await itemPage.selectQuantityOfItems(7);
    await itemPage.clickOnAddToCartButton();
    await itemPage.goToCartPage();
    await cartPage.applyCoupon();
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
    await checkoutPage.addNewBillingAddress(user.firstName, user.lastName, user.address, user.city);
    await checkoutPage.useExistingDeliveryAddress();
    await checkoutPage.addDeliveryMethod(user.comment);
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
