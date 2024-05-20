export const LoginPage = {
  getUsername() {
    return cy.get('[data-test="username"]');
  },
  getPassword() {
    return cy.get('[data-test="password"]');
  },
  getError() {
    return cy.get('[data-test="error"]');
  },
  noErrors() {
    cy.log('**there are no errors**')
    LoginPage.getError().should('not.exist')
    LoginPage.getUsername().should('not.have.class', 'error')
    LoginPage.getPassword().should('not.have.class', 'error')
  },
  getLogin() {
    return cy.get('[data-test="login-button"]');
  },
  showsError() {
    cy.get('[data-test=error]').should('be.visible')
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
  },
}