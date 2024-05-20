import { LoginPage } from './login.page'

describe('anonymous user', () => {
  it('gets an error trying to visit the inventory page', () => {
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/')
    LoginPage.getError()
      .should('be.visible')
      .and('include.text', 'Epic sadface')
      .and('include.text', 'inventory.html')
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
  })
})