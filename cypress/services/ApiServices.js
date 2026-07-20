export class UserService {
  constructor (apiBaseUrl = Cypress.env('apiBaseUrl')) {
    this.apiBaseUrl = apiBaseUrl
  }

  createUser (user) {
    return cy.request({
      method: 'POST',
      url: `${this.apiBaseUrl}/usuarios`,
      body: {
        nome: user.nome,
        email: user.email,
        password: user.password,
        administrador: user.administrador
      },
      failOnStatusCode: false
    })
  }

  login (email, password) {
    return cy.request({
      method: 'POST',
      url: `${this.apiBaseUrl}/login`,
      body: { email, password },
      failOnStatusCode: false
    })
  }

  deleteUser (userId, token) {
    return cy.request({
      method: 'DELETE',
      url: `${this.apiBaseUrl}/usuarios/${userId}`,
      headers: { Authorization: token },
      failOnStatusCode: false
    })
  }

  getUserById (userId, token) {
    return cy.request({
      method: 'GET',
      url: `${this.apiBaseUrl}/usuarios/${userId}`,
      headers: { Authorization: token },
      failOnStatusCode: false
    })
  }
}

export class ProductService {
  constructor (apiBaseUrl = Cypress.env('apiBaseUrl')) {
    this.apiBaseUrl = apiBaseUrl
  }

  createProduct (product, token) {
    const requestOptions = {
      method: 'POST',
      url: `${this.apiBaseUrl}/produtos`,
      body: product,
      failOnStatusCode: false
    }

    if (token) {
      requestOptions.headers = { Authorization: token }
    }

    return cy.request(requestOptions)
  }

  listProducts () {
    return cy.request({
      method: 'GET',
      url: `${this.apiBaseUrl}/produtos`,
      failOnStatusCode: false
    })
  }

  getProductById (productId) {
    return cy.request({
      method: 'GET',
      url: `${this.apiBaseUrl}/produtos/${productId}`,
      failOnStatusCode: false
    })
  }

  deleteProduct (productId, token) {
    return cy.request({
      method: 'DELETE',
      url: `${this.apiBaseUrl}/produtos/${productId}`,
      headers: { Authorization: token },
      failOnStatusCode: false
    })
  }
}
