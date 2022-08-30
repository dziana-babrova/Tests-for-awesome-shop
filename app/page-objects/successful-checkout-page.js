const BasePage = require("./base-page.js");
const logger = require("../../test/config/logger.config.js");
class SuccessfulCheckoutPage extends BasePage {
  get messageTitle() {
    return $("h1");
  }
}

module.exports = new SuccessfulCheckoutPage();
