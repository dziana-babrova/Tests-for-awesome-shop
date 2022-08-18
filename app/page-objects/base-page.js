import Page from "../../app/page-objects/page.js";

export default class BasePage extends Page {
  open() {
    return super.open("/");
  }

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

  get accountSection() {
    return $(".acc-section");
  }

  get loginLink() {
    return $("*=Login");
  }

  async goToLoginPage() {
    await this.accountSection.click();
    await this.loginLink.click();
  }

  get logo() {
    return $("#logo");
  }

  async goToDefaultPage() {
    await this.logo.click();
  }

  get orderHistoryLink() {
    return $("=Order History");
  }

  async goToOrderHistoryPage() {
    await this.accountSection.click();
    await this.orderHistoryLink.click();
  }
}
