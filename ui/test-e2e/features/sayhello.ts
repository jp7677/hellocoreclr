import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(/^I've navigated to the home page$/, () => {
    cy.visit('/')
});

Then(/^I should see the say hello page$/, () => {
    cy.title().should("be", "Say Hello World! | Hello World");
});

When(/^I click on last greetings$/, () => {
    cy.get("a[href=\"#/greetings\"]").click();
});

Then(/^I should see the last greetings page$/, () => {
    cy.title().should("be", "Greetings | Hello World");
});
