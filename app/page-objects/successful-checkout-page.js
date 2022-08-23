import BasePage from "./base-page.js";
import logger from "../../test/config/logger.config.js";
class SuccessfulCheckoutPage extends BasePage {
  get messageTitle() {
    return $("h1");
  }
}

export default new SuccessfulCheckoutPage();
