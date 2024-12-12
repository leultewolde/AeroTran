import { faker } from '@faker-js/faker';

export default Array.from({ length: 16 }, () => ({
  orderId: faker.datatype.number({ min: 10000000, max: 10999999 }),
  orderDate: faker.datatype.number({ min: 20200000, max: 20221231 }),
  totalPrice: faker.commerce.price(100, 1000),
  buyer: faker.name.findName(),
  status: faker.helpers.arrayElement([
    [`Pronto para embalar`, `Marcar como embalado`],
    [`Pronto para envio`, `Notificar envio`],
  ]),
}));
