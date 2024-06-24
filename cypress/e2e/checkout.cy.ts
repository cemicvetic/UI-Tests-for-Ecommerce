import { LoginPage } from './login.page'
import { LoginInfo } from '.'
import {InventoryData} from '../../taste-the-sauce/src/utils/InventoryData'

describe('Checkout', () => {
  const user: LoginInfo = Cypress.env('users').standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    LoginPage.login(user.username, user.password)
  })

  it('goes through the check out pages', { viewportHeight: 1200 }, () => {
    const ids = Cypress._.map(InventoryData, 'id')
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    cy.visit('/cart.html')
    cy.get('.cart_list .cart_item').should('have.length', InventoryData.length)
    cy.contains('button', 'Checkout').click()
    cy.location('pathname').should('equal', '/checkout-step-one.html')
    cy.get('.checkout_info_wrapper form').within(() => {
      cy.get('#first-name').type('Lola')
      cy.get('#last-name').type('Smith')
      cy.get('#postal-code').type('90908')
      cy.get('input[type=submit]')
        .should('have.attr', 'value', 'Continue')
        .click()
    })
    cy.location('pathname').should('equal', '/checkout-step-two.html')
    cy.get('.cart_list .cart_item').should('have.length', InventoryData.length)
    cy.contains('[data-test=finish]', 'Finish').click()
    cy.location('pathname').should('equal', '/checkout-complete.html')
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'cart-contents')
      .should('not.exist')
  })
})
