import BasePage from "../../app/page-objects/base-page.js";

class HomePage extends BasePage {
  get itemToBuy() {
    return $('=Apple Cinema 30"');
  }

  async clickOnItemToBuy() {
    await this.itemToBuy.click();
  }

  async getTextFromItemToBuy() {
    return await this.itemToBuy.getText();
  }

  get itemToBuy2() {
    return $("=iPhone");
  }

  async clickOnItemToBuy2() {
    await this.itemToBuy2.click();
  }
}

export default new HomePage();
