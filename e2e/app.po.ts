export class Angular2DemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2-demo-app h1')).getText();
  }
}
