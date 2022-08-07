export default class Page {
  async open(baseUrl) {
    await browser.url(baseUrl);
    await browser.maximizeWindow();
  }
}
