/* eslint-disable no-undef */
Cypress.Commands.add('getTestid', (testId) => {
  cy.get(`[data-testid=${testId}]`)
})
