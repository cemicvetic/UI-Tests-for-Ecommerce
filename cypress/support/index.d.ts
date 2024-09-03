/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    fillForm(selectorsValues: object): Chainable<JQuery<HTMLFormElement>>
  }
}
