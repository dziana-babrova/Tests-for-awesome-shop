const { Given, When, Then } = require("@wdio/cucumber-framework");
const homePage = require("../../app/page-objects/home-page.js");
const loginPage = require("../../app/page-objects/login-page.js");
const UserFactory = require("../../app/business-objects/user-factory.js");

const newUser = UserFactory.getDefaultUser();

When(/^I login$/, async () => {
  await homePage.goToLoginPage();
  await loginPage.login(newUser);
  await loginPage.goToDefaultPage();
});
