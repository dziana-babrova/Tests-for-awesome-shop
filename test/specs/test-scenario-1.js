const homePage = require("../../app/page-objects/home-page.js");
const itemPage = require("../../app/page-objects/item-page.js");
const cartPage = require("../../app/page-objects/cart-page.js");
const { testDataForScenario1 } = require("../../app/business-objects/data-for-tests.js");

describe("On Awesome-shop", () => {
  it("user could add a product to the cart", async () => {
    await homePage.open();
    const textForItem = await homePage.getTextFromAppleCinemaItem();
    await homePage.clickAppleCinemaItem();
    await itemPage.selectItemValues(testDataForScenario1);
    const valueForTextInput = await itemPage.getTextInputValue();
    const valueForTextArea = await itemPage.getTextAreaValue();
    await itemPage.selectQuantityOfItems(testDataForScenario1);
    const QuntityOfItemsValue = await itemPage.getQuantityOfItems();
    await itemPage.clickOnAddToCartButton();

    await expect(itemPage.successAlert).toBeExisting();
      await expect(itemPage.successAlert).toHaveTextContaining(
        `Success: You have added ${textForItem} to your shopping cart!`
      );

    await itemPage.goToCartPage();

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
    await expect(cartPage.quantityItem).toHaveValue(`${QuntityOfItemsValue}`);

    await expect(cartPage.subTotalLine).toBeExisting();
    const subTotalText = await cartPage.getTextFromSubTotal();
    const subTotalPrice = Number(subTotalText.slice(11, subTotalText.length));
    const vatToBe = (subTotalPrice * 20) / 100;

    await expect(cartPage.vatLine).toBeExisting();
    const vatText = await cartPage.getTextFromVat();
    const vatPrice = Number(vatText.slice(11, vatText.length));

    await expect(vatPrice).toEqual(vatToBe);
  });
});
