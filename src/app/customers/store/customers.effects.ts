import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { CustomersLocalStorageService } from '../services/customers-local-storage.service';
import * as fromActions from './customers.actions';
import * as fromRoot from '@app/store';

@Injectable()
export class CustomersEffects {
  fetchCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.fetchCustomers),
      switchMap(_ =>
        this.customersService.customers$.pipe(
          map(customers => fromActions.fetchCustomersSuccess({ customers }))
        )
      )
    )
  );

  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addCustomer),
      switchMap(action =>
        this.customersService
          .add(action.data)
          .then(customer => fromActions.addCustomerSuccess({ customer }))
          .catch(error => fromActions.addCustomerFailure({ error }))
      )
    )
  );

  editCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.editCustomer),
      switchMap(action =>
        this.customersService
          .edit(action.customer)
          .then(_ =>
            fromActions.editCustomerSuccess({ customer: action.customer })
          )
          .catch(error => fromActions.editCustomerFailure({ error }))
      )
    )
  );

  editCustomerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.editCustomerSuccess),
      mergeMap(({ customer }) => [
        fromRoot.showNotification({
          message: `${customer.firstName} ${customer.lastName} successfuly updated`
        }),
        fromRoot.back()
      ])
    )
  );

  constructor(
    private customersService: CustomersLocalStorageService,
    private actions$: Actions
  ) {}
}
