import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { UserFactory } from '../../../factories/UserFactory'
import { UserService, ProductService } from '../../../services/ApiServices'
import { ProductFactory } from '../../../factories/ProductFactory'

const userService = new UserService()
const productService = new ProductService()

Given('que possuo os dados do usuário {string} com email {string}', (nome, email) => {
  const isValidRegistration = nome.trim() !== '' && email.includes('@')

  const user = isValidRegistration
    ? UserFactory.validUser({ nome, email: `${Date.now()}-${email}` })
    : UserFactory.validUser({ nome, email, password: '123456' })

  cy.wrap(user).as('apiUser')
})

When('envio uma requisição POST para {string}', (endpoint) => {
  cy.get('@apiUser').then((user) => {
    userService.createUser(user).then((response) => {
      cy.wrap(response).as('apiResponse')
    })
  })
})

Then('a resposta da API deve retornar status {int}', (statusCode) => {
  cy.get('@apiResponse').its('status').should('eq', statusCode)
})

Then('a resposta deve conter a mensagem {string}', (message) => {
  cy.get('@apiResponse').then((response) => {
    const bodyText = JSON.stringify(response.body)

    expect(bodyText.toLowerCase()).to.contain(message.toLowerCase())
  })
})

Given('que possuo um usuário cadastrado via API', () => {
  const user = UserFactory.validUser()

  userService.createUser(user).then((response) => {
    expect(response.status).to.eq(201)
    cy.wrap({ user, userId: response.body._id }).as('registeredUser')
  })
})

When('envio uma requisição POST para {string} com as credenciais do usuário', (endpoint) => {
  cy.get('@registeredUser').then(({ user }) => {
    userService.login(user.email, user.password).then((response) => {
      cy.wrap(response).as('apiResponse')
    })
  })
})

When('envio uma requisição POST para {string} com senha incorreta', (endpoint) => {
  cy.get('@registeredUser').then(({ user }) => {
    userService.login(user.email, 'senhaIncorreta123').then((response) => {
      cy.wrap(response).as('apiResponse')
    })
  })
})

When('envio uma requisição POST para {string} com email {string} e senha {string}', (endpoint, email, password) => {
  userService.login(email, password).then((response) => {
    cy.wrap(response).as('apiResponse')
  })
})

Then('a mensagem deve ser {string}', (message) => {
  cy.get('@apiResponse').its('body.message').should('eq', message)
})

Then('o corpo da resposta deve conter um token {string}', (property) => {
  cy.get('@apiResponse').its(`body.${property}`).should('match', /^Bearer .+/)
})

Given('que possuo um usuário administrador autenticado via API', () => {
  cy.createAdminSessionViaApi()
})

Given(/^(?:que )?possuo os dados de um produto válido$/, () => {
  const product = ProductFactory.validProduct()

  cy.wrap(product).as('apiProduct')
})

Given(/^(?:que )?possuo os dados de um produto inválido$/, () => {
  const product = ProductFactory.invalidProduct()

  cy.wrap(product).as('apiProduct')
})

When('envio uma requisição POST para {string} autenticada', (endpoint) => {
  cy.get('@adminSession').then(({ token }) => {
    cy.get('@apiProduct').then((product) => {
      productService.createProduct(product, token).then((response) => {
        if (response.status === 201 && response.body._id) {
          cy.wrap({ productId: response.body._id, token }).as('registeredProduct')
        }

        cy.wrap(response).as('apiResponse')
      })
    })
  })
})

When('envio uma requisição POST para {string} sem autenticação', (endpoint) => {
  cy.get('@apiProduct').then((product) => {
    productService.createProduct(product, null).then((response) => {
      cy.wrap(response).as('apiResponse')
    })
  })
})

When('envio uma requisição GET para {string}', (endpoint) => {
  productService.listProducts().then((response) => {
    cy.wrap(response).as('apiResponse')
  })
})

Then('o corpo da resposta deve conter a propriedade {string}', (property) => {
  cy.get('@apiResponse').its(`body.${property}`).should('exist')
})

Then('a lista de produtos deve possuir ao menos {int} item', (minimum) => {
  cy.get('@apiResponse').its('body.produtos').should('have.length.at.least', minimum)
})

Then('o corpo da resposta deve conter um identificador {string}', (property) => {
  cy.get('@apiResponse').its(`body.${property}`).should('match', /^[\w-]+$/)
})
