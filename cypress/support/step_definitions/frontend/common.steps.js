import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { UserFactory } from '../../../factories/UserFactory'
import { UserService } from '../../../services/ApiServices'
import CadastroPage from '../../../pages/CadastroPage'
import LoginPage from '../../../pages/LoginPage'
import HomePage from '../../../pages/HomePage'

const userService = new UserService()

Given('que estou na página de cadastro de usuários', () => {
  CadastroPage.visit()
})

When('preencho o formulário com um usuário válido', () => {
  const user = UserFactory.validUser()

  cy.wrap(user).as('currentUser')
  cy.wrap({ user }).as('registeredUser')
  CadastroPage.register(user)
})

Then('devo visualizar a mensagem {string}', (message) => {
  cy.get('.alert-link, .alert-dismissible').should('be.visible').and('contain', message)
})

Then('devo ser redirecionado para a home logado', () => {
  cy.get('@currentUser').then((user) => {
    LoginPage.visit()
    LoginPage.login(user.email, user.password)
    HomePage.assertLoggedIn()
  })
})

Given('que existe um usuário cadastrado via API', () => {
  const user = UserFactory.validUser()

  userService.createUser(user).then((response) => {
    expect(response.status).to.eq(201)
    cy.wrap({ user, userId: response.body._id }).as('registeredUser')
  })
})

Given(/^(?:que )?estou na página de login$/, () => {
  LoginPage.visit()
})

When('informo as credenciais válidas do usuário', () => {
  cy.get('@registeredUser').then(({ user }) => {
    LoginPage.login(user.email, user.password)
  })
})

Then('devo ser autenticado com sucesso', () => {
  HomePage.assertLoggedIn()
})

Then('devo visualizar a página home com o carrinho de compras', () => {
  cy.get('[data-testid="shopping-cart-button"]').should('be.visible')
})

When('informo email {string} e senha {string}', (email, password) => {
  LoginPage.login(email, password)
})

When('informo as credenciais inválidas do usuário cadastrado', () => {
  cy.get('@registeredUser').then(({ user }) => {
    LoginPage.login(user.email, 'senhaIncorreta123')
  })
})

Then('devo visualizar a mensagem de erro {string}', (message) => {
  LoginPage.assertErrorMessage(message)
})

Given('que estou logado como usuário comum', () => {
  const user = UserFactory.validUser()

  userService.createUser(user).then((response) => {
    expect(response.status).to.eq(201)

    cy.wrap({ user, userId: response.body._id }).as('registeredUser')

    LoginPage.visit()
    LoginPage.login(user.email, user.password)
    HomePage.assertLoggedIn()
  })
})

Given(/^(?:que )?estou na página home$/, () => {
  cy.visit('/home')
  HomePage.assertLoggedIn()
})

When('adiciono o primeiro produto da lista ao carrinho', () => {
  HomePage.addFirstProductToCart()
})

When('pesquiso pelo produto {string}', (term) => {
  HomePage.searchProduct(term)
})

When('adiciono o produto pesquisado ao carrinho', () => {
  HomePage.addSearchedProductToCart()
})

Then(/^devo visualizar (\d+) produto(?:\(s\))? na listagem$/, (count) => {
  const productCount = Number(count)

  if (productCount === 0) {
    HomePage.assertNoProductsDisplayed()
    return
  }

  HomePage.assertProductCount(productCount)
})

Then('o produto exibido deve conter o nome {string}', (productName) => {
  HomePage.assertProductNameVisible(productName)
})

Then('o produto {string} não deve ser exibido', (productName) => {
  HomePage.assertProductNameNotVisible(productName)
})

Then('o resultado da pesquisa deve ser {string}', (resultado) => {
  if (resultado === 'nenhum') {
    HomePage.assertNoProductsDisplayed()
    return
  }

  HomePage.assertProductNameVisible(resultado)
})

Then('devo ser redirecionado para a lista de compras', () => {
  HomePage.assertProductAddedToCart()
})

When('clico no botão de logout', () => {
  HomePage.logout()
})

When('clico no link de cadastro', () => {
  LoginPage.goToRegister()
})

Then('devo visualizar a página de cadastro de usuários', () => {
  cy.url().should('include', '/cadastrarusuarios')
  cy.get('[data-testid="cadastrar"]').should('be.visible')
})

Then('devo ser redirecionado para a página de login', () => {
  HomePage.assertOnLoginPage()
})
