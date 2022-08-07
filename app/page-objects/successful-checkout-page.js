import BasePage from "./base-page.js";

class SuccessfulCheckoutPage extends BasePage {
  get messageTitle() {
    return $("h1");
  }
}

export default new SuccessfulCheckoutPage();
