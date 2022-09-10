import { faker } from '@faker-js/faker';
import { Customer, CustomerStatus } from '../types/customer';

export function generateRandomCustomer(): Customer {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName(sex);
  return {
    id: faker.datatype.uuid(),
    firstName,
    lastName,
    email: faker.internet.email(firstName, lastName),
    status: faker.helpers.arrayElement(Object.values(CustomerStatus)),
    phone: faker.phone.number('1-###-###-####')
  };
}

export function generateRandomCustomers(length = 20) {
  return Array.from({ length }).map(_ => generateRandomCustomer());
}
