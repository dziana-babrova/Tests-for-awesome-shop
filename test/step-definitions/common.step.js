const { Given, Then, When } = require("@wdio/cucumber-framework");
const homePage = require("../../app/page-objects/home-page.js");

Given(/^I'm on awesome-shop.ru$/, async function () {
  await homePage.open();
});

When(/^I open PDP of "([^"]*)"$/, async function (product) {
  if (product === "Apple computer") {
    let textForItem = await homePage.getTextFromAppleCinemaItem();
    await homePage.clickAppleCinemaItem();
    module.exports = { textForItem };
  } else if (product === "iPhone") {
    await homePage.clickIPhoneItem();
  }
});
