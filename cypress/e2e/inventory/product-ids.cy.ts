import { LoginPage } from '@support/pages/login.page'

describe('Products', () => {
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

  it.skip('have unique ids', () => {
    cy.get('.inventory_item')
      .should('have.length.greaterThan', 3)
      .invoke('toArray')
      .then((elements) => elements.map((el) => el.getAttribute('data-itemid')))
      .should((ids) => {
        const unique = Cypress._.uniq(ids)
        expect(unique).to.deep.equal(ids)
      })
  })

  it.skip('have unique ids', () => {
    cy.get('.inventory_item')
      .should('have.length.greaterThan', 3)
      .invoke('toArray')
      .mapInvoke('getAttribute', 'data-itemid')
      .print('ids %o')
      .should((ids) => {
        const unique = Cypress._.uniq(ids)
        expect(unique).to.deep.equal(ids)
      })
  })

  it('have unique ids', () => {
    cy.get('.inventory_item')
      .should('have.length.greaterThan', 3)
      .mapInvoke('getAttribute', 'data-itemid')
      .print('ids %o')
      .should((ids) => {
        const unique = Cypress._.uniq(ids)
        expect(unique).to.deep.equal(ids)
      })
  })
})
