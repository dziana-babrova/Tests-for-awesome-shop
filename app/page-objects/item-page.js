import BasePage from "../../app/page-objects/base-page.js";
import { faker } from "@faker-js/faker";
const randomText = {
  textInputValue: faker.lorem.text(Math.round(Math.random() * (4 - 1) + 1)),
  textAreaInputValue: faker.lorem.text(Math.round(Math.random() * (40 - 1) + 1)),
};

class ItemPage extends BasePage {
  open() {
    return super.open("/index.php?route=product/product&product_id=42");
  }

  get mediumRadiobutton() {
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

  async selectItemValues() {
    await this.mediumRadiobutton.click();
    await this.checkbox2.click();
    await this.checkbox4.click();
    await this.textInput.setValue(randomText.textInputValue);
    await this.colorDropdown.click();
    await this.colorOption.click();
    await this.textArea.setValue(randomText.textAreaInputValue);
  }

  async selectQuantityOfItems(itemsQuantity) {
    await this.quantityOfItems.setValue(itemsQuantity);
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
