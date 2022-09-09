import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject } from 'rxjs';
import { CUSTOMERS_COLLECTION } from '../constants';
import { Customer, CustomerData } from '../types/customer';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable()
export class CustomersLocalStorageService {
  private _localStorage: Storage;

  private customersBehavior$ = new BehaviorSubject<Customer[]>([]);

  constructor(protected _localStorageRefService: LocalStorageRefService) {
    this._localStorage = this._localStorageRefService.localStorage;
    this.customersBehavior$.next(this.customers);
  }

  private updateStorage(customers: Customer[]) {
    this._localStorage.setItem(CUSTOMERS_COLLECTION, JSON.stringify(customers));
    this.customersBehavior$.next(customers);
  }

  get customers$() {
    return this.customersBehavior$.asObservable();
  }

  get customers() {
    const customerRawData = this._localStorage.getItem(CUSTOMERS_COLLECTION);
    const customers = JSON.parse(customerRawData) as Customer[];
    return customers;
  }

  add(data: CustomerData) {
    const customer = {
      id: faker.datatype.uuid(),
      ...data
    };
    const customers = [...this.customers, customer];

    this.updateStorage(customers);

    return Promise.resolve(customer);
  }

  edit(customer: Customer) {
    const customers = this.customers;
    const customerToEditIndex = customers.findIndex(_ => (_.id = customer.id));
    customers[customerToEditIndex] = { ...customer };

    this.updateStorage(customers);

    return Promise.resolve();
  }

  get(customerId: string) {
    const customer = this.customers.find(_ => _.id === customerId);

    return Promise.resolve(customer);
  }
}
