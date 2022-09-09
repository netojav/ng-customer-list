import { Component, OnInit } from '@angular/core';
import { CustomersFacade } from '@app/customers/store/customers.facade';

@Component({
  selector: 'app-customer-edit-container',
  template: `
    <mat-card class="container mat-elevation-z0">
      <mat-card-title>Edit Customer</mat-card-title>
      <mat-card-content>
        <div fxLayout="column" fxLayoutGap="10px">
          <app-customer-form
            fxLayout="row"
            [customer]="customersFacade.currentCustomer$ | async"
            (save)="customersFacade.edit($event)"
          ></app-customer-form>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class CustomerEditContainerComponent implements OnInit {
  constructor(public customersFacade: CustomersFacade) {}
  ngOnInit(): void {
    this.customersFacade.fetchCustomers();
  }
}
