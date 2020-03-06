import { Given, Then, When, defineParameterType } from "cypress-cucumber-preprocessor/steps";

defineParameterType({
    name: "text",
    regexp: /(short|weird|long)/,
    transformer(text: string): string {
        if (text === "short") {
            return "sh";
        } else if (text === "weird") {
            return "Some {}";
        } else if (text === "long") {
            return "verylong";
        }
    }
});

defineParameterType({
    name: "yesno",
    regexp: /(can|cannot)/,
    transformer(text: string): boolean {
        if (text === "can") {
            return true;
        }
        return false;
    }
});

Given("I've navigated to the home page", function() {
    cy.visit("/");
});

Then("I should see the Say Hello page", function() {
    cy.title().should("equal", "Say Hello World! | Hello World");
});

When("I click on last greetings", function() {
    cy.get('[data-testid="open-greetings"]').click();
});

Then("I should see the last greetings page", function() {
    cy.title().should("equal", "Greetings | Hello World");
});

When("I click on Say Hello", function() {
    cy.get('[data-testid="open-home"]').click();
});

When("I enter a {text} text", function(text: string) {
    cy.get('[data-testid="greeting"]').type(text);
});

Then("I {yesno} say hello", function(enabled: boolean) {
    if (enabled) {
        cy.get('[data-testid="submit"]').should("be.enabled");
    } else {
        cy.get('[data-testid="submit"]').should("be.disabled");
    }
});
