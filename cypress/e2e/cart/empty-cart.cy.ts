import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { LoginInfo } from '..'

describe('Empty cart', () => {
  const user: LoginInfo = Cypress.env('users').standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  it('disables the Checkout button', () => {
    LoginPage.login(user.username, user.password)
    cy.visit('/cart.html')
    InventoryPage.getCartBadge().should('not.exist')
    cy.get('[data-test="checkout"]').should('be.visible').and('be.disabled')
  })
})