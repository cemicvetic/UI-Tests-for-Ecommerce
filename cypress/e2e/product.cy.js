import { LoginPage } from './login.page'

describe('Product', () => {
  /** @type {{username: string, password: string}} */
  const user = Cypress.env('users').standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('shows the item', () => {
    const name = 'Sauce Labs Fleece Jacket'
    const price = '$49.99'
    cy.contains('.inventory_item', name)
      .should('have.attr', 'data-itemid')
      .should('be.a', 'string')
      .then((itemId) => {
        cy.contains('.inventory_item', name)
          .find('.inventory_item_label a')
          .should('have.attr', 'id', `item_${itemId}_title_link`)
          .click()
        cy.location('pathname').should('equal', '/inventory-item.html')
        cy.location('search').should('include', `id=${itemId}`)
        cy.get('#inventory_item_container .inventory_details')
          .should('be.visible')
          .within(() => {
            cy.contains('.inventory_details_name.large_size', name)
            cy.contains('.inventory_details_price', price)
          })
      })
    cy.get('[data-test="back-to-products"]').click()
    cy.location('pathname').should('equal', '/inventory.html')
  })
})
