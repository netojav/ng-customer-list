import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { CUSTOMERS_COLLECTION } from '../constants';
import { Customer, CustomerStatus } from '../types/customer';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable()
export class CustomersGeneratorService {
  private localStorage: Storage;
  constructor(private localStorageRefService: LocalStorageRefService) {
    this.localStorage = localStorageRefService.localStorage;
  }
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
    if (!this.localStorage[CUSTOMERS_COLLECTION]) {
      const customers = Array.from({ length }).map(_ =>
        this.generateRandomCustomer()
      );
      this.localStorage.setItem(
        CUSTOMERS_COLLECTION,
        JSON.stringify(customers)
      );
    }
  }
}
