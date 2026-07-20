class HomePage {
  assertLoggedIn () {
    cy.url().should('include', '/home')
    cy.get('[data-testid="shopping-cart-button"]').should('be.visible')
    return this
  }

  searchProduct (term) {
    cy.get('[data-testid="pesquisar"]').clear()

    if (term) {
      cy.get('[data-testid="pesquisar"]').type(term)
    }

    cy.get('[data-testid="botaoPesquisar"]').click()
    return this
  }

  assertProductCount (count) {
    cy.get('[data-testid="adicionarNaLista"]').should('have.length', count)
    return this
  }

  assertProductNameVisible (productName) {
    cy.contains('h5', productName).should('be.visible')
    return this
  }

  assertProductNameNotVisible (productName) {
    cy.contains('h5', productName).should('not.exist')
    return this
  }

  assertNoProductsDisplayed () {
    cy.get('[data-testid="adicionarNaLista"]').should('not.exist')
    return this
  }

  addFirstProductToCart () {
    cy.get('[data-testid="adicionarNaLista"]').first().click()
    return this
  }

  addSearchedProductToCart () {
    cy.get('[data-testid="adicionarNaLista"]').first().click()
    return this
  }

  assertProductAddedToCart () {
    cy.url().should('include', '/minhaListaDeProdutos')
    cy.contains('Lista de Compras').should('be.visible')
    cy.contains(/Quantidade Total|R\$/).should('be.visible')
    return this
  }

  logout () {
    cy.get('[data-testid="logout"]').click()
    return this
  }

  assertOnLoginPage () {
    cy.url().should('include', '/login')
    cy.get('[data-testid="email"]').should('be.visible')
    return this
  }
}

export default new HomePage()
