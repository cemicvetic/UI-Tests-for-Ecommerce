import { LoginPage } from './login.page'

describe('Cart', () => {
  /** @type {{username: string, password: string}} */
  const user = Cypress.env('users').standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('adds items to the cart', () => {

  })
})
