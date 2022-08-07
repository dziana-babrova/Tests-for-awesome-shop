import BasePage from "../../app/page-objects/base-page.js";

class LoginPage extends BasePage {
  get inputEmail() {
    return $("#input-email");
  }

  get inputPassword() {
    return $("#input-password");
  }

  get buttonLogin() {
    return $('input[value="Login"]');
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.buttonLogin.click();
  }
}

export default new LoginPage();
