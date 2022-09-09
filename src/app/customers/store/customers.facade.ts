import { Store } from '@ngrx/store';
import { Customer, CustomerData, SortBy } from '../types/customer';
import * as fromSelectors from './customers.selectors';
import * as fromActions from './customers.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomersFacade {
  customers$ = this.store.select(
    fromSelectors.selectFilteredAndSorteredCustomersPaginated
  );

  customersLength$ = this.store.select(fromSelectors.selectCustomersLength);

  sortBy$ = this.store.select(fromSelectors.selectSortBy);
  searchTerm$ = this.store.select(fromSelectors.selectSearchByLastNameTerm);
  currentCustomer$ = this.store.select(fromSelectors.selectCurrentCustomer);

  constructor(private store: Store) {}

  fetchCustomers() {
    this.store.dispatch(fromActions.fetchCustomers());
  }

  add(data: CustomerData) {
    this.store.dispatch(fromActions.addCustomer({ data }));
  }

  edit(customer: Customer) {
    this.store.dispatch(fromActions.editCustomer({ customer }));
  }

  filterByLastName(searchTerm: string) {
    this.store.dispatch(fromActions.filterCustomersByLastName({ searchTerm }));
  }

  sortBy(sortBy: SortBy) {
    this.store.dispatch(fromActions.sortCustomers({ sortBy }));
  }
  paginateCustomers(event: { pageIndex: number; pageSize: number }) {
    this.store.dispatch(fromActions.paginateCustomers(event));
  }
}
