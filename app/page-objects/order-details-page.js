import BasePage from "../../app/page-objects/base-page.js";
import logger from "../../test/config/logger.config.js";
class OrderDetailsPage extends BasePage {
  get orderedItem() {
    return $("td=iPhone");
  }
}

export default new OrderDetailsPage();
