beforeEach(() => {
  cy.log('**log in**')
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')

  cy.fixture('bike-light.json').as('item')
})

it('has an item with details', function () {
  cy.contains('.inventory_item', this.item.name).within(() => {
    cy.contains('.inventory_item_name', this.item.name)
    cy.contains('.inventory_item_desc', this.item.description)
    cy.contains('.inventory_item_price', this.item.price)
  })
})
