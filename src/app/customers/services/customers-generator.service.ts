import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { CUSTOMERS_COLLECTION } from '../constants';
import { Customer, CustomerStatus } from '../types/customer';
import { CustomersLocalStorageService } from './customers-local-storage.service';

@Injectable()
export class CustomersGeneratorService {
  constructor(
    private customersLocalStorageService: CustomersLocalStorageService
  ) {}
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
      phone: faker.phone.number('1-###-###-####')
    };
  }

  generateRandomCustomers(length = 20) {
    if (!this.customersLocalStorageService.customers) {
      const customers = Array.from({ length }).map(_ =>
        this.generateRandomCustomer()
      );
      this.customersLocalStorageService.updateStorage(customers);
    }
  }
}
