export class Page {
  async open(url) {
    return await browser.url(url);
  }
}