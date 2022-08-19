import BasePage from "../../app/page-objects/base-page.js";
class ItemPage extends BasePage {
  open() {
    return super.open("/index.php?route=product/product&product_id=42");
  }

  get mediumRadioButton() {
    return $("label*=Medium");
  }

  get checkbox2() {
    return $("label*=Checkbox 2");
  }

  get checkbox4() {
    return $("label*=Checkbox 4");
  }

  get textInput() {
    return $("#input-option208");
  }

  get colorDropdown() {
    return $("select#input-option217");
  }

  get colorOption() {
    return $("option*=Green");
  }

  get textArea() {
    return $("#input-option209");
  }

  get quantityOfItems() {
    return $("input#input-quantity");
  }

  get addToCartButton() {
    return $("button=Add to Cart");
  }

  get successAlert() {
    return $(".alert-success");
  }

  async selectItemValues(randomInput) {
    await browser.execute(() => {
      const radioButton2 = document.querySelectorAll("input[type=radio]")[1];
      const checkbox2 = document.querySelectorAll("input[type=checkbox]")[1];
      const checkbox4 = document.querySelectorAll("input[type=checkbox]")[3];
      radioButton2.click();
      checkbox2.click();
      checkbox4.click();
    });
    await this.textInput.setValue(setOfData.textInputValue);
    await this.colorDropdown.click();
    await this.colorOption.click();
    await this.textArea.setValue(setOfData.textAreaInputValue);
  }

  async selectQuantityOfItems(quantity) {
    await this.quantityOfItems.setValue(quantity.quantityOfItems);
  }

  async clickOnAddToCartButton() {
    await this.addToCartButton.click();
  }

  async getTextInputValue() {
    return this.textInput.getText();
  }

  async getTextAreaValue() {
    return this.textArea.getText();
  }

  async getQuantityOfItems() {
    return this.quantityOfItems.getValue();
  }
}

export default new ItemPage();
