import BasePage from "../../app/page-objects/base-page.js";

import { faker } from "@faker-js/faker";
const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress({ useFullAddress: false }),
  city: faker.address.city(),
  comment: faker.lorem.words(Math.round(Math.random() * (20 - 1) + 1)),
};

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

  get existingDeliveryAddressRadiobutton() {
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

  async addNewBillingAddress() {
    await this.newAddressRadioButton.click();
    await this.firstNameInput.setValue(user.firstName);
    await this.lastNameInput.setValue(user.lastName);
    await this.address1Input.setValue(user.address);
    await this.cityInput.setValue(user.city);
    await this.regionDropdown.click();
    await this.regionDropdownOption.click();
    await this.submitBillingAddressButton.click();
  }

  async useExistingDeliveryAddress() {
    await this.existingDeliveryAddressRadiobutton.click();
    await this.submitDeliveryAddressButton.click();
  }

  async addDeliveryMethod() {
    await this.commentOnOrder.setValue(user.comment);
    await this.submitCommentOnOrderButton.click();
  }

  async addPaymentMethod() {
    await this.cashOnDeliveryPaymentMethod.click();
  }

  async confirmPaymentMethod() {
    await this.agreementToTermsCheckbox.click();
    await this.submitPaymentMethodButton.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}

export default new CheckoutPage();
