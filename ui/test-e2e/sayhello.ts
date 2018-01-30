import { expect } from "chai";
import { Given, Then, When } from "cucumber";
import { browser, by, element } from "protractor";

Given(/^I've navigated to the home page$/, async () => {
    await browser.loadAndWaitForAureliaPage("/");
});

Then(/^I should see the say hello page$/, async () => {
    expect(await browser.getTitle()).to.equal("Say Hello World! | Hello World");
});

When(/^I click on last greetings$/, async () => {
    const waitPromise = browser.waitForRouterComplete();
    await element(by.css('a[href="#/greetings"]')).click();
    await waitPromise;
});

Then(/^I should see the last greetings page$/, async () => {
    expect(await browser.getTitle()).to.equal("Greetings | Hello World");
});
