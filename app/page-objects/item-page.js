const BasePage = require("../../app/page-objects/base-page.js");
const logger = require("../../test/config/logger.config.js");
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

  async selectItemValues(setOfData) {
    await browser.execute(async () => {
      const radioButton2 = document.querySelectorAll("input[type=radio]")[1];
      const checkbox2 = document.querySelectorAll("input[type=checkbox]")[1];
      const checkbox4 = document.querySelectorAll("input[type=checkbox]")[3];
      await radioButton2.click();
      await checkbox2.click();
      await checkbox4.click();
    });
    logger.debug(
      `Clicking '${await this.mediumRadioButton.selector}' radiobutton, '${await this.checkbox2.selector}', '${await this.checkbox4
        .selector}'`
    );
    await this.textInput.setValue(setOfData.textInputValue);
    logger.debug(`Entering '${setOfData.textInputValue}' into '${await this.textInput.selector}' field`);
    await this.colorDropdown.click();
    logger.debug(`Opening '${await this.colorDropdown.selector}' dropdown with colors`);
    await this.colorOption.click();
    logger.debug(`Selecting '${await this.colorOption.selector}' color`);
    await this.textArea.setValue(setOfData.textAreaInputValue);
    logger.debug(`Entering '${setOfData.textAreaInputValue}' into '${await this.textArea.selector}' field`);
  }

  async selectQuantityOfItems(quantity) {
    await this.quantityOfItems.setValue(quantity.quantityOfItems);
    logger.debug(`Set ${quantity.quantityOfItems} items into '${await this.quantityOfItems.selector}' quantity field`);
  }

  async clickOnAddToCartButton() {
    await this.addToCartButton.click();
    logger.debug(`Clicking '${await this.addToCartButton.selector}' button`);
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

module.exports = new ItemPage();
