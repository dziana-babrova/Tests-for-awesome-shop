import HomePage from "../../app/page-objects/home-page.js";
import LoginPage from "../../app/page-objects/login-page.js";
import ItemPage from "../../app/page-objects/item-page.js";
import CartPage from "../../app/page-objects/cart-page.js";
import CheckoutPage from "../../app/page-objects/checkout-page.js";
import SuccessfulCheckoutPage from "../../app/page-objects/successful-checkout-page.js";
import OrderHistoryPage from "../../app/page-objects/order-history-page.js";
import OrderDetailsPage from "../../app/page-objects/order-details-page.js";

describe("On Awesome-shop", () => {
  it("user could log in and complete a checkout with a coupon", async () => {
    await HomePage.open();
    await HomePage.goToLoginPage();
    await LoginPage.login("SarahJasmine@gmail.com", "123Qwer!");
    await LoginPage.goToDefaultPage();
    await HomePage.clickOnItemToBuy2();
    await ItemPage.selectQuantityOfItems(7);
    await ItemPage.clickOnAddToCartButton();
    await ItemPage.goToCartPage();
    await CartPage.applyCoupon();
    await expect(CartPage.appliedCouponAlert).toBeExisting();
    await expect(CartPage.appliedCouponAlert).toHaveTextContaining("Success: Your coupon discount has been applied!");

    await expect(CartPage.subTotalLine).toBeExisting();
    const subTotalText = await CartPage.getTextFromSubTotal();
    const subTotalPrice = Number(subTotalText.slice(11, subTotalText.length).replace(",", ""));
    const discountToBe = -((subTotalPrice * 15) / 100);

    await expect(CartPage.discountLine).toBeExisting();
    const discountText = await CartPage.getTextFromDiscountLine();
    const discountPrice = Number(discountText.slice(21, discountText.length));

    expect(discountPrice).toEqual(discountToBe);

    await CartPage.goToCheckoutPage();
    await CheckoutPage.addNewBillingAddress();
    await CheckoutPage.useExistingDeliveryAddress();
    await CheckoutPage.addDeliveryMethod();
    await CheckoutPage.addPaymentMethod();
    await CheckoutPage.confirmPaymentMethod();
    await CheckoutPage.confirmOrder();

    await expect(SuccessfulCheckoutPage.messageTitle).toBeExisting();
    await expect(SuccessfulCheckoutPage.messageTitle).toHaveTextContaining("Your order has been placed!");

    await SuccessfulCheckoutPage.goToOrderHistoryPage();
    await OrderHistoryPage.clickOnFirstViewButton();
    await expect(OrderDetailsPage.orderedItem).toBeExisting();
  });
});
