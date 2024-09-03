import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'

interface LoginInfo {
  username: string
  password: string
}

describe('Cart', () => {
  /** @type {{username: string, password: string}} */
  const user: LoginInfo = Cypress.env('users').standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('adds items to the cart', { viewportHeight: 1200 }, () => {
    InventoryPage.getCartBadge().should('not.exist')
    InventoryPage.addItemToCart('Sauce Labs Bike Light')
    cy.contains('.inventory_item', 'Sauce Labs Bike Light').within(() => {
      cy.contains('button', 'Add to cart').should('not.exist')
      cy.contains('button', 'Remove')
    })
    InventoryPage.getCartBadge()
      .should('have.text', 1)
      .scrollIntoView()
      .should('be.visible')
    InventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt')
    cy.contains('.inventory_item', 'Sauce Labs Bolt T-Shirt').within(() => {
      cy.contains('button', 'Add to cart').should('not.exist')
      cy.contains('button', 'Remove')
    })
    InventoryPage.getCartBadge()
      .should('have.text', 2)
      .scrollIntoView()
      .should('be.visible')
    cy.get('.inventory_item:contains("Remove")').should('have.length', 2)
  })
})