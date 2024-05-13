import 'cypress-map'

it('confirms the item with the lowest price (cypress-map)', () => {
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')


  cy.get('[data-test="login-button"]').click()

  cy.location('pathname').should('equal', '/inventory.html')

  cy.get('.inventory_list')
    .should('be.visible')
    .find('.inventory_item_price')
    .should('have.length.greaterThan', 3)
    .map('innerText') // ["$1.00". "$2.00", ...]
    .print()
    .mapInvoke('substr', 1) // ["1.00". "2.00", ...]
    .print()
    .map(Number) // [1.00. 2.00, ...]
    .print()
    .apply(Cypress._.min) // 1.00 (min item in the array)
    .should('equal', 7.99)
})