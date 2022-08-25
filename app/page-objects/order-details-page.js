const BasePage = require("../../app/page-objects/base-page.js");
const logger = require("../../test/config/logger.config.js");
class OrderDetailsPage extends BasePage {
  get orderedItem() {
    return $("td=iPhone");
  }
}

module.exports = new OrderDetailsPage();
