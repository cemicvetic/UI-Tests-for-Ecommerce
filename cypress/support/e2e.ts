// @ts-ignore
Cypress.Commands.add('fillForm', () => {
  cy.get('.checkout_info_wrapper form').within(() => {
    cy.get('#first-name').type('Lola')
    cy.get('#last-name').type('Smith')
    cy.get('#postal-code').type('90908')
    cy.get('input[type=submit]')
      .should('have.attr', 'value', 'Continue')
      .click()
  })
})