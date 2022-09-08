import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Customer, CustomerStatus } from '../types/customer';

@Injectable()
export class CustomersGeneratorService {
  generateRandomCustomer(): Customer {
    const sex = faker.name.sexType();
    const firstName = faker.name.firstName(sex);
    const lastName = faker.name.lastName(sex);
    return {
      id: faker.datatype.uuid(),
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName),
      status: faker.helpers.arrayElement(Object.values(CustomerStatus)),
      phone: faker.phone.number()
    };
  }

  generateRandomCustomers(length = 20) {
    return Array.from({ length }).map(_ => this.generateRandomCustomer());
  }
}
