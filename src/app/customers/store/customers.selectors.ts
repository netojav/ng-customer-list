import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { orderBy, sortBy } from 'lodash';
import { adapter, State } from './customers.reducer';
import * as fromRoot from '@app/store/selectors';

export const featureKey = 'customers';

export const selectCustomerModuleState =
  createFeatureSelector<State>(featureKey);

const { selectEntities, selectAll } = adapter.getSelectors(
  selectCustomerModuleState
);

export const selectFilteredAndSorteredCustomers = createSelector(
  selectCustomerModuleState,
  selectAll,
  (state, customers) => {
    const filteredCustomers = customers.filter(_ =>
      state.searchByLastNameTerm
        ? _.lastName
            .toLowerCase()
            .indexOf(state.searchByLastNameTerm.toLowerCase()) >= 0
        : true
    );
    return orderBy(
      filteredCustomers,
      state.sortBy.field,
      state.sortBy.direction ? state.sortBy.direction : true
    );
  }
);

export const selectFilteredAndSorteredCustomersPaginated = createSelector(
  selectCustomerModuleState,
  selectFilteredAndSorteredCustomers,
  (state, customers) =>
    customers?.slice(
      state.pageIndex * state.pageSize,
      (state.pageIndex + 1) * state.pageSize
    )
);

export const selectCustomersLength = createSelector(
  selectFilteredAndSorteredCustomers,
  customers => customers?.length ?? 0
);

export const selectSortBy = createSelector(
  selectCustomerModuleState,
  state => state?.sortBy
);

export const selectSearchByLastNameTerm = createSelector(
  selectCustomerModuleState,
  state => state?.searchByLastNameTerm
);

export const selectCurrentCustomer = createSelector(
  fromRoot.selectRouteParams,
  selectEntities,
  (params, customerEntities) =>
    params?.customerId &&
    customerEntities &&
    customerEntities[params.customerId]
);
