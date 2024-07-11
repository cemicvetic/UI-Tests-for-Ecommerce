import { LoginPage } from '../../support/pages/login.page'

describe('Login form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows an error for empty username field', () => {
    LoginPage.getLogin().click()
    LoginPage.showsError('Epic sadface: Username is required')
  })

  it('shows an error for empty password field', () => {
    LoginPage.getUsername().type('name')
    LoginPage.getLogin().click()
    LoginPage.showsError('Epic sadface: Password is required')
  })
})
