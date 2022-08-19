import BasePage from "../../app/page-objects/base-page.js";
class CartPage extends BasePage {
  open() {
    return super.open("/index.php?route=checkout/cart");
  }

  get radioItem() {
    return $("small*=Radio:");
  }

  get checkbox2Item() {
    return $("small*=Checkbox: Checkbox 2");
  }

  get checkbox4Item() {
    return $("small*=Checkbox: Checkbox 4");
  }

  get textItem() {
    return $("small*=Text:");
  }

  get selectItem() {
    return $("small*=Select:");
  }

  get textAreaItem() {
    return $("small*=Textarea:");
  }

  get quantityItem() {
    return $("#content > form > div > table > tbody > tr > td:nth-child(4) > div > input");
  }

  get subTotalLine() {
    return $("tr*=Sub-Total");
  }

  async getTextFromSubTotal() {
    return await this.subTotalLine.getText();
  }

  get vatLine() {
    return $("tr*=VAT");
  }

  async getTextFromVat() {
    return await this.vatLine.getText();
  }

  get useCouponCodeOption() {
    return $("=Use Coupon Code");
  }

  get couponField() {
    return $("#input-coupon");
  }

  get applyCouponButton() {
    return $("#button-coupon");
  }

  async applyCoupon(coupon) {
    await this.useCouponCodeOption.click();
    await this.couponField.setValue(coupon.couponLuckyUser);
    await browser.keys("Tab");
    await browser.keys("Enter");
  }

  get appliedCouponAlert() {
    return $(".alert-success");
  }

  get discountLine() {
    return $("tr*=Coupon (LuckyUser):");
  }

  async getTextFromDiscountLine() {
    return await this.discountLine.getText();
  }

  get checkoutButton() {
    return $("#content > div.buttons.clearfix > div.pull-right > a");
  }

  async goToCheckoutPage() {
    await this.checkoutButton.click();
  }
}

export default new CartPage();
