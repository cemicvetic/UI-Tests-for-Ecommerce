import 'cypress-map'
chai.use(require("chai-sorted"));

it('sorts item by price', () => {
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
  cy.get('[data-test="product_sort_container"]').select('lohi')
  cy.get('.inventory_item_price')
    .map('innerText')
    .mapInvoke('slice', 1)
    .map(Number)
    .print()
    //.should((prices) => {
   //   const sorted = Cypress._.sortBy(prices)
  //    expect(prices, 'sorted prices').to.deep.equal(sorted)
  //  })
    .should('be.sorted')
})

