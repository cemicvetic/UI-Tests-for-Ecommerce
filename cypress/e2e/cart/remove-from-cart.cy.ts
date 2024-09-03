import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { LoginInfo } from '..'

describe('Cart', () => {
  const user: LoginInfo = Cypress.env('users').standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('removes items from cart', { viewportHeight: 1200 }, () => {
    InventoryPage.addItemToCart('Sauce Labs Bike Light')
    InventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt')
    InventoryPage.getCartBadge().should('have.text', 2).click()
    cy.log('**we are on the cart page**')
    cy.location('pathname').should('equal', '/cart.html')
    cy.get('.cart_list .cart_item').should('have.length', 2)
    cy.log('**remove the Bike Light**')
    cy.contains('.cart_list .cart_item', 'Bike Light')
      .contains('button', 'Remove')
      .click()
    cy.log('**the T-shirt item still remains**')
    cy.get('.cart_list .cart_item')
      .should('have.length', 1)
      .contains('Bolt T-Shirt')
    InventoryPage.getCartBadge().should('have.text', 1)
  })
})