const Page = require("../../app/page-objects/page.js");
const logger = require( "../../test/config/logger.config.js");

class BasePage extends Page {
  open() {
    return super.open("/");
  }

  get cartIcon() {
    return $("#cart");
  }

  get viewCartLink() {
    return $("=View Cart");
  }

  async goToCartPage() {
    await this.cartIcon.click();
    logger.debug(`Viewing minimized cart by clicking '${await this.cartIcon.selector}' icon`);
    await this.viewCartLink.click();
    logger.debug(`Viewing full-screen cart by clicking '${await this.viewCartLink.selector}' link`);
  }

  get accountSection() {
    return $(".acc-section");
  }

  get loginLink() {
    return $("*=Login");
  }

  async goToLoginPage() {
    await this.accountSection.click();
    logger.debug(`Opening menu by clicking '${await this.accountSection.selector}' icon`);
    await this.loginLink.click();
    logger.debug(`Opening login page by clicking '${await this.loginLink.selector}' link`);
  }

  get logo() {
    return $("#logo");
  }

  async goToDefaultPage() {
    await this.logo.click();
    logger.debug(`Returning to main page by clicking '${await this.logo.selector}' icon`);
  }

  get orderHistoryLink() {
    return $("=Order History");
  }

  async goToOrderHistoryPage() {
    await this.accountSection.click();
    logger.debug(`Opening menu by clicking '${await this.accountSection.selector}' icon`);
    await this.orderHistoryLink.click();
    logger.debug(`Opening order history page by clicking '${await this.orderHistoryLink.selector}' link`);
  }
}

module.exports = BasePage;