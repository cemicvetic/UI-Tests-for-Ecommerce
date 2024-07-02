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

  it('shows the tax within limits', { viewportHeight: 1200 }, () => {
    const pickedItems = Cypress._.sampleSize(InventoryData, 3)
    const ids = Cypress._.map(pickedItems, 'id')
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    cy.visit('/checkout-step-one.html')
    cy.get('.checkout_info_wrapper form').within(() => {
      cy.get('#first-name').type('Joe')
      cy.get('#last-name').type('Smith')
      cy.get('#postal-code').type('90210')
      cy.get('input[type=submit]')
        .should('have.attr', 'value', 'Continue')
        .click()
    })
    cy.location('pathname').should('equal', '/checkout-step-two.html')
    // the overview page shows the expected number of picked items
    cy.get('.cart_list .cart_item').should('have.length', pickedItems.length)
    const prices = Cypress._.map(pickedItems, 'price')
    const sum = Cypress._.sum(prices)
    cy.log(prices.join(' + ') + ' = ' + sum)
    const minTax = sum * 0.05
    const maxTax = sum * 0.1
    cy.log(`tax between $${minTax} and $${maxTax}`)
    cy.contains('.summary_tax_label', /\$\d+\.\d\d$/)
      .invoke('text')
      .invoke('match', /\$(?<tax>\d+\.\d\d)$/)
      .its('groups.tax')
      .then(Number)
      .should('be.within', minTax, maxTax)
  })
})