
// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))
import 'cypress-map'

describe('sorting', () => {
  beforeEach(() => {
    cy.log('**log in**')
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.location('pathname').should('equal', '/inventory.html')
  })
  /**
   * Sorts item by price
   * @param {'lohi'|'hilo'|'az'|'za'} order
   */
  function sortByPriceOrName(order) {
    // confirm the argument value at runtime
    expect(order, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
    cy.log(`**sort by price ${order}**`)
    cy.get('[data-test="product_sort_container"]').select(order)
  }

  function getPrices() {
    return cy
      .get('.inventory_item_price')
      .map('innerText')
      .mapInvoke('slice', 1)
      .map(Number)
      .print('sorted prices %o')
  }

  it('by price lowest to highest', () => {
    sortByPriceOrName('lohi')
    getPrices().should('be.ascending')
  })

  it('by price highest to lowest', () => {
    sortByPriceOrName('hilo')
    getPrices().should('be.descending')
  })
})
