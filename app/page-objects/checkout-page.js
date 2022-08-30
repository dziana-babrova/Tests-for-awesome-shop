const BasePage = require("../../app/page-objects/base-page.js");
const logger = require("../../test/config/logger.config.js");
class CheckoutPage extends BasePage {
  get newBillingAddressRadioButton() {
    return $("label*=new address");
  }

  get firstNameInput() {
    return $("#input-payment-firstname");
  }

  get lastNameInput() {
    return $("#input-payment-lastname");
  }

  get address1Input() {
    return $("#input-payment-address-1");
  }

  get cityInput() {
    return $("#input-payment-city");
  }

  get regionDropdown() {
    return $("[name=zone_id]");
  }

  get regionDropdownOption() {
    return $("#input-payment-zone > option:nth-child(2)");
  }

  get newAddressRadioButton() {
    return $("#collapse-payment-address > div > form > div:nth-child(3) > label > input[type=radio]");
  }

  get submitBillingAddressButton() {
    return $("input#button-payment-address");
  }

  get existingDeliveryAddressRadioButton() {
    return $("label*=existing address");
  }

  get submitDeliveryAddressButton() {
    return $("#button-shipping-address");
  }

  get commentOnOrder() {
    return $("[name=comment]");
  }

  get submitCommentOnOrderButton() {
    return $("input#button-shipping-method");
  }

  get cashOnDeliveryPaymentMethod() {
    return $("label*=Cash On Delivery");
  }

  get agreementToTermsCheckbox() {
    return $("[name=agree]");
  }

  get submitPaymentMethodButton() {
    return $("input#button-payment-method");
  }

  get confirmOrderButton() {
    return $("#button-confirm");
  }

  async addNewBillingAddress(user) {
    await this.newAddressRadioButton.click();
    logger.debug(`Adding new address by clicking '${await this.newAddressRadioButton.selector}' button`);
    await this.firstNameInput.setValue(user.firstName);
    logger.debug(`Entering '${user.firstName}' into '${await this.firstNameInput.selector}' field`);
    await this.lastNameInput.setValue(user.lastName);
    logger.debug(`Entering '${user.lastName}' into '${await this.lastNameInput.selector}' field`);
    await this.address1Input.setValue(user.address);
    logger.debug(`Entering '${user.address}' into '${await this.address1Input.selector}' field`);
    await this.cityInput.setValue(user.city);
    logger.debug(`Entering '${user.city}' into '${await this.cityInput.selector}' field`);
    await this.regionDropdown.click();
    logger.debug(`Opening '${await this.regionDropdown.selector}' dropdown`);
    await this.regionDropdownOption.click();
    logger.debug(`Selecting '${await this.regionDropdownOption.selector}'`);
    await this.submitBillingAddressButton.click();
    logger.debug(`Submitting billing address by clicking '${await this.submitBillingAddressButton.selector}' button`);
  }

  async useExistingDeliveryAddress() {
    await this.existingDeliveryAddressRadioButton.click();
    logger.debug(`Selecting existing delivery address by clicking '${await this.existingDeliveryAddressRadioButton.selector}'`);
    await this.submitDeliveryAddressButton.click();
    logger.debug(`Submitting delivery address by clicking '${await this.submitDeliveryAddressButton.selector}' button`);
  }

  async addDeliveryMethod(setOfData) {
    await this.commentOnOrder.setValue(setOfData.comment);
    logger.debug(`Entering '${await setOfData.comment}' into '${await this.commentOnOrder.selector}' field`);
    await this.submitCommentOnOrderButton.click();
    logger.debug(`Submitting delivery method by clicking '${await this.submitCommentOnOrderButton.selector}' button`);
  }

  async addPaymentMethod() {
    await this.cashOnDeliveryPaymentMethod.click();
    logger.debug(`Selecting '${await this.cashOnDeliveryPaymentMethod.selector}' payment method`);
  }

  async confirmPaymentMethod() {
    await this.agreementToTermsCheckbox.click();
    logger.debug(`Checking '${await this.agreementToTermsCheckbox.selector}'`);
    await this.submitPaymentMethodButton.click();
    logger.debug(`Submitting payment method by clicking '${await this.submitPaymentMethodButton.selector}' checkbox`);
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
    logger.debug(`Confirming order by clicking '${await this.confirmOrderButton.selector}' button`);
  }
}

module.exports = new CheckoutPage();
