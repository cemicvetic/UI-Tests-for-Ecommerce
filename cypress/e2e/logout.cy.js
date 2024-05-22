import { LoginPage } from './login.page';

it('logs out', () => {
  cy.visit('/inventory.html');
  LoginPage.login('standard_user', 'secret_sause')
  cy.location('pathname').should('eq', '/inventory.html');
  cy.get('#react-burger-menu-btn').click()
  cy.get('.bm-menu-wrap').should('be.visible')
    .contains('.menu-item', 'Logout')
    .click()
  cy.location('pathname').should('equal', '/');

  cy.visit('/inventory.html');
  LoginPage.showsError( "Epic sadface: You can only access '/inventory.html' when you are logged in.",)
})