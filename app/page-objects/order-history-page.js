import BasePage from "../../app/page-objects/base-page.js";

class OrderHistoryPage extends BasePage {
  get firstViewButton() {
    return $(".btn-info");
  }

  async clickOnFirstViewButton() {
    await this.firstViewButton.click();
  }
}

export default new OrderHistoryPage();
