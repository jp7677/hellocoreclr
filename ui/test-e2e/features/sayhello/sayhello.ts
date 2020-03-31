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
    },
});

defineParameterType({
    name: "yesno",
    regexp: /(can|cannot)/,
    transformer(text: string): boolean {
        if (text === "can") {
            return true;
        }
        return false;
    },
});

Given("I've navigated to the home page", () => {
    cy.visit("/");
});

Then("I should see the Say Hello page", () => {
    cy.title().should("equal", "Say Hello World! | Hello World");
});

When("I click on last greetings", () => {
    cy.get("testid|open-greetings").click();
});

Then("I should see the last greetings page", () => {
    cy.title().should("equal", "Greetings | Hello World");
});

When("I click on Say Hello", () => {
    cy.get("testid|open-home").click();
});

When("I enter a {text} text", (text: string) => {
    cy.get("testid|greeting").type(text);
});

Then("I {yesno} say hello", (enabled: boolean) => {
    if (enabled) {
        cy.get("testid|submit").should("be.enabled");
    } else {
        cy.get("testid|submit").should("be.disabled");
    }
});
