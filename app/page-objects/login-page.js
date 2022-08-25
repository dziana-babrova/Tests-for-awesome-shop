const BasePage = require( "../../app/page-objects/base-page.js");
const logger = require("../../test/config/logger.config.js");
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

  async login(user) {
    await this.inputEmail.setValue(user.email);
    logger.debug(`Entering '${await user.email}' into '${await this.inputEmail.selector}' field`);
    await this.inputPassword.setValue(user.password);
    logger.debug(`Entering '${await user.password}' into '${await this.inputPassword.selector}' field`);
    await this.buttonLogin.click();
    logger.debug(`Clicking '${await this.buttonLogin.selector}' button`);
  }
}

module.exports = new LoginPage();
