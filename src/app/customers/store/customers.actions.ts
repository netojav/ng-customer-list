import { createAction, props } from '@ngrx/store';
import { Customer, CustomerData, SortBy } from '../types/customer';

export const fetchCustomers = createAction('[Customers] Fetch Customers');
export const fetchCustomersSuccess = createAction(
  '[Customers] Fetch Customers Success',
  props<{ customers: Customer[] }>()
);
export const fetchCustomersFailure = createAction(
  '[Customers] Fetch Customers Failure',
  props<{ error: Error }>()
);

export const addCustomer = createAction(
  '[Customers] Add Customer',
  props<{ data: CustomerData }>()
);

export const addCustomerSuccess = createAction(
  '[Customers] Add Customer Success',
  props<{ customer: Customer }>()
);

export const addCustomerFailure = createAction(
  '[Customers] Add Customer Failure',
  props<{ error: Error }>()
);

export const editCustomer = createAction(
  '[Customers] Edit Customer',
  props<{ customer: Customer }>()
);

export const editCustomerSuccess = createAction(
  '[Customers] Edit Customer Success',
  props<{ customer: Customer }>()
);

export const editCustomerFailure = createAction(
  '[Customers] Edit Customer Failure',
  props<{ error: Error }>()
);

export const filterCustomersByLastName = createAction(
  '[Customers] Filter Customers by Last Name',
  props<{ searchTerm: string }>()
);

export const sortCustomers = createAction(
  '[Customers] Sort Customers',
  props<{ sortBy: SortBy }>()
);
