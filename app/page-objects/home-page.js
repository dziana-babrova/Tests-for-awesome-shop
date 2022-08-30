const BasePage = require("../../app/page-objects/base-page.js");
const logger = require("../../test/config/logger.config.js");

class HomePage extends BasePage {
  get appleCinemaItem() {
    return $('=Apple Cinema 30"');
  }

  async clickAppleCinemaItem() {
    await this.appleCinemaItem.click();
    logger.debug(`Clicking '${await this.appleCinemaItem.selector}' item`);
  }

  async getTextFromAppleCinemaItem() {
    return await this.appleCinemaItem.getText();
  }

  get iPhoneItem() {
    return $("=iPhone");
  }

  async clickIPhoneItem() {
    await this.iPhoneItem.click();
    logger.debug(`Clicking '${await this.iPhoneItem.selector}' item`);
  }
}

module.exports = new HomePage();
