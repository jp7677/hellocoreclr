import { Given, Then, When } from "cucumber";
import { browser, by, element } from "protractor";

import { expect } from "chai";

browser.ignoreSynchronization = true;

async function waitForBrowserTitleChange(): Promise<boolean> {
    const currentTitle = await browser.getTitle();
    return browser.wait(async () => (await browser.getTitle()) !== currentTitle);
}

Given(/^I've navigated to the home page$/, async () => {
    await browser.get("/");
    await browser.wait(async () => {
        const title = await browser.getTitle();
        return !title.startsWith("Loading");
    });
});

Then(/^I should see the say hello page$/, async () => {
    expect(await browser.getTitle()).to.equal("Say Hello World! | Hello World");
});

When(/^I click on last greetings$/, async () => {
    const navigationReady = waitForBrowserTitleChange();
    await element(by.css('a[href="#/greetings"]')).click();
    await navigationReady;
});

Then(/^I should see the last greetings page$/, async () => {
    expect(await browser.getTitle()).to.equal("Greetings | Hello World");
});
