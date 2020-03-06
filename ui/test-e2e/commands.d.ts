declare namespace Cypress {
    interface Chainable<Subject> {
        getTestid(testid: string): Chainable<HTMLElement>;
    }
}
