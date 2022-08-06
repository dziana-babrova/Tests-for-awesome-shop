import { Page } from "../../app/page-objects/page.js";

export class BasePage extends Page {
  get cartIcon() {
    return $("#cart");
  }

  get viewCartLink() {
    return $("=View Cart");
  }

  async goToCartPage() {
    await this.cartIcon.click();
    await this.viewCartLink.click();
  }
}
