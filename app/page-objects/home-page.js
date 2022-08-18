import BasePage from "../../app/page-objects/base-page.js";

class HomePage extends BasePage {
  get appleCinemaItem() {
    return $('=Apple Cinema 30"');
  }

  async clickAppleCinemaItem() {
    await this.appleCinemaItem.click();
  }

  async getTextFromAppleCinemaItem() {
    return await this.appleCinemaItem.getText();
  }

  get iPhoneItem() {
    return $("=iPhone");
  }

  async clickIPhoneItem() {
    await this.iPhoneItem.click();
  }
}

export default new HomePage();
