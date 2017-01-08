import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as protractor from "protractor";

before(() => {
  chai.use(chaiAsPromised);
});

describe("End2end test suite (typescript)", () => {
  it("should load completely and have a title", () => {
    protractor.browser.loadAndWaitForAureliaPage("/");
    return chai.expect(protractor.browser.getTitle()).to.eventually.be.equal("Say Hello World! | Hello World");
  });
});
