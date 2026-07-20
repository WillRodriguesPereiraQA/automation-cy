class CadastroPage {
  visit () {
    cy.visit('/cadastrarusuarios')
    return this
  }

  fillName (name) {
    cy.get('[data-testid="nome"]').clear().type(name)
    return this
  }

  fillEmail (email) {
    cy.get('[data-testid="email"]').clear().type(email)
    return this
  }

  fillPassword (password) {
    cy.get('[data-testid="password"]').clear().type(password, { log: false })
    return this
  }

  setAdministrator (isAdmin) {
    if (isAdmin) {
      cy.get('[data-testid="checkbox"]').click({ force: true })
    }

    return this
  }

  submit () {
    cy.get('[data-testid="cadastrar"]').click()
    return this
  }

  register (user) {
    this.fillName(user.nome)
      .fillEmail(user.email)
      .fillPassword(user.password)
      .setAdministrator(user.administrador === 'true')
      .submit()

    return this
  }

  assertSuccessMessage (message) {
    cy.get('.alert-link').should('be.visible').and('have.text', message)
    return this
  }

  assertErrorMessage (message) {
    cy.get('.alert-dismissible').should('be.visible').and('contain', message)
    return this
  }
}

export default new CadastroPage()
