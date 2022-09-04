const logger = require("../../test/config/logger.config.js")
class Page {
  async open(baseUrl) {
    await browser.url(baseUrl);
    logger.debug("Opening Awesome shop");
    // await browser.maximizeWindow();

  }
}

module.exports = Page;