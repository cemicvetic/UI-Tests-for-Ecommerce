
import { LoginPage } from "@support/pages/login.page"
import { LoginInfo } from '..'
import { CheckoutPage } from '@support/pages/checkout.page'
import { InventoryData } from '@fixtures/inventory-data'

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
    cy.get('.checkout_info_wrapper form')
      .find('input[type=submit]')
      .should('have.attr', 'value', 'Continue')
    CheckoutPage.fillInformationForm().submit()
    cy.location('pathname').should('equal', '/checkout-step-two.html')
    // the overview page shows the expected number of picked items
    cy.get('.cart_list .cart_item').should('have.length', pickedItems.length)
    const prices = Cypress._.map(pickedItems, 'price')
    // and sum the prices to compute the expected total price
    // using Lodash method _.sum
    const sum = Cypress._.sum(prices)
    // print the picked prices and the computed sum
    // to the Command Log for clarity
    cy.log(prices.join(' + ') + ' = ' + sum)
    // calculate min and max reasonable tax: 5% and 10% of the order
    // note: we don't have to round the numbers
    // since we will use them in numerical assertion
    const minTax = sum * 0.05
    const maxTax = sum * 0.1
    // print the min and max tax to Command Log
    cy.log(`tax between $${minTax} and $${maxTax}`)
    // confirm the page shows the tax and the text $...X.YZ
    // can be converted into a number
    // and is between min and max tax amounts
    // Hint: https://glebbahmutov.com/cypress-examples/recipes/dollar-range.html
    cy.contains('.summary_tax_label', /\$\d+\.\d\d$/)
      // grab the element's text
      .invoke('text')
      // match the text using a regular expression with a named capture group "tax"
      .invoke('match', /\$(?<tax>\d+\.\d\d)$/)
      // from the regular expression match get its "groups" property
      // get the "tax" property, it should be a string
      .its('groups.tax')
      // convert the text to a number
      // https://on.cypress.io/then
      .then(Number)
      // and confirm the number is between min and max tax numbers
      // https://glebbahmutov.com/cypress-examples/commands/assertions.html
      .should('be.within', minTax, maxTax)
  })
})
