
import {LoginPage} from '../../support/pages/login.page'
import{LoginInfo} from '../index'
// @ts-ignore
import { InventoryData } from '@fixtures/inventory-data'

describe('Cart', () => {
  const user: LoginInfo = Cypress.env('users').standard
  if (!user) {
    throw new Error('Missing the standard user')
  }
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
  })

  it('shows the cart items', { viewportHeight: 1200 }, () => {
    const items = [
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Onesie',
    ]
    const ids = items.map((name) => Cypress._.find(InventoryData, { name })!.id)
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    cy.visit('/cart.html')
    cy.get('.cart_list .cart_item').should('have.length', items.length)
    cy.log('**shows each item in order**')
    items.forEach((itemName, k) => {
      cy.get('.cart_list .cart_item')
        .eq(k)
        .within(() => {
          cy.contains('.inventory_item_name', itemName)
          cy.contains('.cart_quantity', 1)
        })
    })
  })
})
