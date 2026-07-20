class LoginPage {
  visit () {
    cy.visit('/login')
    return this
  }

  fillEmail (email) {
    cy.get('[data-testid="email"]').clear().type(email)
    return this
  }

  fillPassword (password) {
    cy.get('[data-testid="senha"]').clear().type(password, { log: false })
    return this
  }

  submit () {
    cy.get('[data-testid="entrar"]').click()
    return this
  }

  login (email, password) {
    this.fillEmail(email).fillPassword(password).submit()
    return this
  }

  goToRegister () {
    cy.contains('a', 'Cadastre-se').click()
    return this
  }

  assertErrorMessage (message) {
    cy.get('.alert-dismissible, .alert-link').should('be.visible').and('contain', message)
    return this
  }
}

export default new LoginPage()
