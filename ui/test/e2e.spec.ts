import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as protractor from "protractor";

before(() => {
  chai.use(chaiAsPromised);
});

beforeEach(async() => {
    await protractor.browser.loadAndWaitForAureliaPage("/");
});

describe("HelloWorld app", () => {
  it("should load completely and have a title", async() => {
    return chai.expect(protractor.browser.getTitle()).to.eventually.be.equal("Say Hello World! | Hello World");
  });

  it("should navigate to greetings", async() => {
    await protractor.element(protractor.by.css('a[href="#/greetings"]')).click();
    // the sleep statement should be replace with
    // await protractor.browser.waitForRouterComplete();
    // but unfortunately we get bitten by
    // https://github.com/aurelia/protractor-plugin/issues/2
    await protractor.browser.sleep(1000);
    return chai.expect(protractor.browser.getTitle()).to.eventually.be.equal("Greetings | Hello World");
  });
});
