import { LoginPage } from '../../support/pages/login.page'
import { LoginInfo } from '../index'
import {InventoryData} from '../../../taste-the-sauce/src/utils/InventoryData'

describe('Checkout', () => {
  const user: LoginInfo = Cypress.env('users').standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    LoginPage.login(user.username, user.password)
  })

  it('shows the right total price', { viewportHeight: 1200 }, () => {
    const pickedItems = Cypress._.sampleSize(InventoryData, 3)
    const ids = Cypress._.map(pickedItems, 'id')
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    cy.visit('/checkout-step-one.html')
      cy.get('.checkout_info_wrapper form').fillForm({
        '#first-name': 'Lola',
        '#last-name': 'Dora',
        '#postal-code': '98706'
      }).submit()
    cy.location('pathname').should('equal', '/checkout-step-two.html')
    cy.get('.cart_list .cart_item').should('have.length', pickedItems.length)
    const prices = Cypress._.map(pickedItems, 'price')
    const sum = Cypress._.sum(prices)
    cy.log(prices.join(' + ') + ' = ' + sum)
    cy.contains('.summary_subtotal_label', '$' + sum)
  })
})