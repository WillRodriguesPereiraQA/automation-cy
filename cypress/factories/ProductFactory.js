import { faker } from '@faker-js/faker/locale/pt_BR'

export class ProductFactory {
  static validProduct (overrides = {}) {
    return {
      nome: `Produto ${faker.commerce.productName()} ${faker.string.alphanumeric(4)}`,
      preco: faker.number.int({ min: 10, max: 5000 }),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 }),
      ...overrides
    }
  }

  static invalidProduct () {
    return {
      nome: '',
      preco: -1,
      descricao: '',
      quantidade: 0
    }
  }
}
