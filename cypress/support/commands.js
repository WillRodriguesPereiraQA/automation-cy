import { UserService, ProductService } from '../services/ApiServices'
import { UserFactory } from '../factories/UserFactory'

const userService = new UserService()
const productService = new ProductService()

const aliasExists = (aliasName) => {
  const aliases = Cypress.state('aliases') || {}

  return Object.prototype.hasOwnProperty.call(aliases, aliasName)
}

Cypress.Commands.add('createAdminSessionViaApi', () => {
  const admin = UserFactory.adminUser()

  userService.createUser(admin).then((createResponse) => {
    expect(createResponse.status).to.eq(201)

    userService.login(admin.email, admin.password).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200)

      cy.wrap({
        user: admin,
        userId: createResponse.body._id,
        token: loginResponse.body.authorization
      }).as('adminSession')
    })
  })
})

Cypress.Commands.add('createUserSessionViaApi', () => {
  const user = UserFactory.validUser()

  userService.createUser(user).then((createResponse) => {
    expect(createResponse.status).to.eq(201)

    userService.login(user.email, user.password).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200)

      cy.wrap({
        user,
        userId: createResponse.body._id,
        token: loginResponse.body.authorization
      }).as('userSession')
    })
  })
})

Cypress.Commands.add('cleanupTestData', () => {
  if (aliasExists('registeredUser')) {
    cy.get('@registeredUser').then(({ userId, user }) => {
      if (userId && user) {
        userService.login(user.email, user.password).then((loginResponse) => {
          if (loginResponse.status === 200) {
            userService.deleteUser(userId, loginResponse.body.authorization)
          }
        })
      }
    })
  }

  if (aliasExists('userSession')) {
    cy.get('@userSession').then(({ userId, token }) => {
      userService.deleteUser(userId, token)
    })
  }

  if (aliasExists('adminSession')) {
    cy.get('@adminSession').then(({ userId, token }) => {
      userService.deleteUser(userId, token)
    })
  }

  if (aliasExists('registeredProduct')) {
    cy.get('@registeredProduct').then(({ productId, token }) => {
      productService.deleteProduct(productId, token)
    })
  }
})
