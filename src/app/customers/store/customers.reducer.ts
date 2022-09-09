import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Customer, SortBy } from '../types/customer';
import * as customerActions from './customers.actions';

export interface State extends EntityState<Customer> {
  sortBy: SortBy;
  searchByLastNameTerm: string;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

const initialState: State = adapter.getInitialState({
  sortBy: { field: 'lastName', direction: 'asc' },
  searchByLastNameTerm: null
});

export const reducer = createReducer(
  initialState,
  on(customerActions.fetchCustomers, state => adapter.removeAll(state)),
  on(customerActions.fetchCustomersSuccess, (state, action) =>
    adapter.upsertMany(action.customers, state)
  ),
  on(customerActions.addCustomerSuccess, (state, action) =>
    adapter.addOne(action.customer, state)
  ),
  on(customerActions.editCustomerSuccess, (state, action) =>
    adapter.updateOne(
      {
        id: action.customer.id,
        changes: action.customer
      },
      state
    )
  ),
  on(customerActions.filterCustomersByLastName, (state, action) => ({
    ...state,
    searchByLastNameTerm: action.searchTerm
  })),
  on(customerActions.sortCustomers, (state, action) => ({
    ...state,
    sortBy: action.sortBy
  }))
);
