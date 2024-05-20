import { LoginPage } from './login.page'

it('shows a login error', () => {
  cy.visit('/')
 LoginPage.getUsername().type('locked_out_user')
 LoginPage.getPassword().type('secret_sauce')


  cy.log('**there are no errors**')
  LoginPage.noErrors()

  cy.log('**shows errors**')
  cy.get('[data-test="login-button"]').click()

  LoginPage.getUsername().should('have.class', 'error')
  LoginPage.getPassword().should('have.class', 'error')
  LoginPage.getError().should('have.text','Epic sadface: Sorry, this user has been locked out.')
    .wait(1000).find('.error-button').click()
  cy.location('pathname').should('equal', '/')

  cy.log('**errors go away**')
  LoginPage.noErrors()
  LoginPage.getUsername().should('have.value', 'locked_out_user')
  LoginPage.getPassword().should('have.value', 'secret_sauce')

})
