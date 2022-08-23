import BasePage from "../../app/page-objects/base-page.js";
import logger from "../../test/config/logger.config.js";
class OrderHistoryPage extends BasePage {
  get firstViewButton() {
    return $(".btn-info");
  }

  async clickOnFirstViewButton() {
    await this.firstViewButton.click();
    logger.debug(`Opening order details page by clicking '${await this.firstViewButton.selector}' button`);
  }
}

export default new OrderHistoryPage();
