import BasePage from "../../app/page-objects/base-page.js";

class OrderDetailsPage extends BasePage {
  get orderedItem() {
    return $("td=iPhone");
  }
}

export default new OrderDetailsPage();
