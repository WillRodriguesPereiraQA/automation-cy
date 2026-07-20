import { faker } from '@faker-js/faker/locale/pt_BR'

export class UserFactory {
  static validUser (overrides = {}) {
    const uniqueId = Date.now()

    return {
      nome: `Usuario QA ${uniqueId}`,
      email: `usuario.qa.${uniqueId}@teste.com`,
      password: 'Test@123456',
      administrador: 'false',
      ...overrides
    }
  }

  static adminUser (overrides = {}) {
    return this.validUser({ administrador: 'true', ...overrides })
  }

  static invalidEmailUser () {
    return {
      nome: faker.person.fullName(),
      email: 'email-invalido',
      password: faker.internet.password({ length: 8 }),
      administrador: 'false'
    }
  }

  static emptyNameUser () {
    const user = this.validUser()

    return {
      ...user,
      nome: ''
    }
  }
}
