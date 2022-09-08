import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CUSTOMERS_COLLECTION } from '../constants';
import { Customer } from '../types/customer';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable()
export class CustomersLocalStorageService {
  private _localStorage: Storage;

  private customersBehavior$ = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersBehavior$.asObservable();

  constructor(protected _localStorageRefService: LocalStorageRefService) {
    this._localStorage = this._localStorageRefService.localStorage;
  }

  private updateStorage(customers: Customer[]) {
    this._localStorage.setItem(CUSTOMERS_COLLECTION, JSON.stringify(customers));
    this.customersBehavior$.next(customers);
  }

  get customers() {
    const customerRawData = this._localStorage.getItem(CUSTOMERS_COLLECTION);
    const customers = JSON.parse(customerRawData) as Customer[];
    return customers;
  }

  add(customer: Customer) {
    const customers = [...this.customers, customer];

    this.updateStorage(customers);
  }

  edit(customer: Customer) {
    const customers = this.customers;
    const customerToEditIndex = customers.findIndex(_ => (_.id = customer.id));
    customers[customerToEditIndex] = { ...customer };

    this.updateStorage(customers);
  }

  get(customerId: string) {
    const customer = this.customers.find(_ => _.id === customerId);

    return customer;
  }
}
