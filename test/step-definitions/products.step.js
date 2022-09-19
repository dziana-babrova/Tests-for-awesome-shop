const { Given, When, Then } = require("@wdio/cucumber-framework");
const itemPage = require("../../app/page-objects/item-page.js");
const { testDataForScenario1, testDataForScenario2 } = require("../../app/business-objects/data-for-tests.js");

When(/^I choose parameters of "([^"]*)"$/, async function (product) {
  if (product === "Apple computer") {
    await itemPage.selectItemValues(testDataForScenario1);
    let valueForTextInput = await itemPage.getTextInputValue();
    let valueForTextArea = await itemPage.getTextAreaValue();
    await itemPage.selectQuantityOfItems(testDataForScenario1);
    let quantityOfItemsValue = await itemPage.getQuantityOfItems();

    module.exports = { valueForTextArea, valueForTextInput, quantityOfItemsValue };
  } else if (product === "iPhone") {
    await itemPage.selectQuantityOfItems(testDataForScenario2);
  }
});

When(/^I add the product to the cart$/, async () => {
  await itemPage.clickOnAddToCartButton();
  await expect(itemPage.successAlert).toBeExisting();
  await itemPage.goToCartPage();
});
