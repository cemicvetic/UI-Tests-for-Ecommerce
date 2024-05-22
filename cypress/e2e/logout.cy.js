import { LoginPage } from './login.page'

/** @type {{username: string, password: string}} */
const user = Cypress.env('users').standard

if (!user) {
  throw new Error('Missing the standard user')
}

it('logs out', () => {
  LoginPage.login(user.username, user.password)
  cy.visit('/inventory.html')
  cy.location('pathname').should('equal', '/inventory.html')
  cy.contains('button', 'Open Menu').click()
  cy.get('.bm-menu-wrap')
    .should('be.visible')
    .contains('.menu-item', 'Logout')
    .click()
  cy.location('pathname').should('equal', '/')
  // we cannot go to the inventory again
  cy.visit('/inventory.html')
  LoginPage.showsError(
    "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  )
})