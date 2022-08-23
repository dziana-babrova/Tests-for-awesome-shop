import logger from "../../test/config/logger.config.js"
export default class Page {
  async open(baseUrl) {
    await browser.url(baseUrl);
    logger.debug("Opening Awesome shop");
    await browser.maximizeWindow();

  }
}
