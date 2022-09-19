const { Given, When, Then } = require("@wdio/cucumber-framework");
const homePage = require("../../app/page-objects/home-page.js");
const cartPage = require("../../app/page-objects/cart-page.js");
const { coupons } = require("../../app/business-objects/data-for-tests.js");

When(/^the product with selected parameters is added to the cart$/, async () => {
  const { valueForTextArea, valueForTextInput, quantityOfItemsValue } = require("./products.step.js");

  await expect(homePage.appleCinemaItem).toBeExisting();
  await expect(cartPage.radioItem).toHaveTextContaining("Radio: Medium");
  await expect(cartPage.checkbox2Item).toHaveTextContaining("Checkbox: Checkbox 2");
  await expect(cartPage.checkbox4Item).toHaveTextContaining("Checkbox: Checkbox 4");
  await expect(cartPage.textItem).toHaveTextContaining(`${valueForTextInput}`);
  await expect(cartPage.selectItem).toHaveTextContaining("Green");
  let testValueForTextArea = "";
  if (valueForTextArea.length > 20) {
    testValueForTextArea = await valueForTextArea.slice(20);
  } else {
    testValueForTextArea = await valueForTextArea;
  }

  await expect(cartPage.textAreaItem).toHaveTextContaining(`${testValueForTextArea}`);
  await expect(cartPage.quantityItem).toHaveValue(`${quantityOfItemsValue}`);

  await expect(cartPage.subTotalLine).toBeExisting();
  const subTotalText = await cartPage.getTextFromSubTotal();
  const subTotalPrice = Number(subTotalText.slice(11, subTotalText.length));
  const vatToBe = (subTotalPrice * 20) / 100;

  await expect(cartPage.vatLine).toBeExisting();
  const vatText = await cartPage.getTextFromVat();
  const vatPrice = Number(vatText.slice(11, vatText.length));

  await expect(vatPrice).toEqual(vatToBe);
});

When(/^I apply a coupon$/, async () => {
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
});

