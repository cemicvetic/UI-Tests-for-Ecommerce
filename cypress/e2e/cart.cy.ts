import {LoginPage} from './login.page'
import {InventoryPage } from './inventory.page'
import {LoginInfo } from './index'

describe('Cart', () => {
  const user: LoginInfo = Cypress.env('user').standard

  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })
  it('shows the added items in order they were added', {viewportHeight: 1200},
    () => {
    const items = [
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Onesie',
    ]
      items.forEach(InventoryPage.addItemToCart)
      cy.log('**added all items to cart**')
      InventoryPage.getCartBadge().should('have.text', items.length)
        .scrollIntoView()
        .wait(1000)
        .click()
      cy.location('pathname').should('equal', '/cart.html')
      cy.get('.cart_list) .cart_item').should('have.length', items.length)
      cy.log('**shows each items in order**')
      items.forEach((itemName, q) => {
        cy.get('.cart_list.cart_item').eq(q).within(() => {
          cy.contains('.inventory_item_name', itemName)
          cy.contains('.cart_quantity', 1)
        })

      })
  })
})





