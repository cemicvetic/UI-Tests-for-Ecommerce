import 'cypress-data-session'

describe('sorting', () => {
  beforeEach(() => {
    cy.dataSession({
      name: 'user session',
      setup() {
        cy.log('**log in**')
        cy.visit('/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.location('pathname').should('equal', '/inventory.html')

        cy.getCookie('session-username').should('exist')
      },

      recreate(userCookie) {
        cy.setCookie('session-username', userCookie.value, userCookie)
        cy.visit('/inventory.html')

        cy.location('pathname').should('equal', '/inventory.html')
      },
      shareAcrossSpecs: true,
    })
  })
})