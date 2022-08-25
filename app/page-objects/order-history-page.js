const BasePage = require("../../app/page-objects/base-page.js");
const logger = require("../../test/config/logger.config.js");
class OrderHistoryPage extends BasePage {
  get firstViewButton() {
    return $(".btn-info");
  }

  async clickOnFirstViewButton() {
    await this.firstViewButton.click();
    logger.debug(`Opening order details page by clicking '${await this.firstViewButton.selector}' button`);
  }
}

module.exports = new OrderHistoryPage();
