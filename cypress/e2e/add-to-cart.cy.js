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

    it('adds items to the cart', { viewportHeight: 1200 }, () => {
      // confirm the cart badge does not exist at first
      cy.get('.shopping_cart_link')
        .find('.shopping_cart_badge')
        .should('not.exist')

      cy.contains('.inventory_item', 'Sauce Labs Bike Light').within(() => {
        cy.contains('button', 'Add to cart').click()
        cy.contains('button', 'Add to cart').should('not.exist')
        cy.contains('button', 'Remove')
      })
      cy.get('.shopping_cart_link')
        .contains('.shopping_cart_badge', 1)
        .scrollIntoView()
        .should('be.visible')
      cy.contains('.inventory_item', 'Sauce Labs Bolt T-Shirt').within(() => {
        cy.contains('button', 'Add to cart').click()
        cy.contains('button', 'Add to cart').should('not.exist')
        cy.contains('button', 'Remove')
      })
      cy.get('.shopping_cart_link')
        .contains('.shopping_cart_badge', 2)
        .scrollIntoView()
        .should('be.visible')
      cy.get('.inventory_item:contains("Remove")').should('have.length', 2)
    })
  })
