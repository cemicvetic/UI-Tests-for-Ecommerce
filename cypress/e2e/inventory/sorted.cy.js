/**
 * Sorts inventory by the given sort order
 * @param {'lohi'|'hilo'|'az'|'za'} sortOrder
 */
function selectSort(sortOrder) {
  expect(sortOrder, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
  cy.get('[data-test="product_sort_container"]').select(sortOrder)
}

/**
 * @param {'lohi'|'hilo'|'az'|'za'} sortOrder
 */
function confirmSorted(sortOrder) {
  const assertion =
    sortOrder === 'lohi' || sortOrder === 'az'
      ? 'be.ascending'
      : 'be.descending'

  if (sortOrder === 'lohi' || sortOrder === 'hilo') {
    cy.get('.inventory_item_price')
      .map('innerText')
      .mapInvoke('slice', 1)
      .map(Number)
      .print('sorted prices %o')
      .should(assertion)
  } else {
    cy.get('.inventory_item_name')
      .map('innerText')
      .print('sorted names %o')
      .should(assertion)
  }
}

describe('sorting', () => {
  it('by price', () => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.location('pathname').should('equal', '/inventory.html')
    const sortOrder = 'az'
    selectSort(sortOrder)
    confirmSorted(sortOrder)
  })
})
