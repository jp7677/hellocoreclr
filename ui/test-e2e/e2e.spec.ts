import * as protractor from "protractor";

describe("HelloWorld app", () => {
  beforeEach(async () => {
    await protractor.browser.loadAndWaitForAureliaPage("/");
    await protractor.browser.waitForRouterComplete();
  });

  it("should load completely and have a title", async () => {
    await expect(await protractor.browser.getTitle()).toBe("Say Hello World! | Hello World");
  });

  it("should navigate to greetings", async () => {
    await protractor.element(protractor.by.css('a[href="#/greetings"]')).click();
    await protractor.browser.waitForRouterComplete();
    await expect(await protractor.browser.getTitle()).toBe("Greetings | Hello World");
  });
});
