import { Component, OnInit } from '@angular/core';
import { CustomersFacade } from '@app/customers/store/customers.facade';

@Component({
  selector: 'app-customer-list-container',
  template: `
    <mat-card class="container mat-elevation-z0">
      <mat-card-title>Customer List</mat-card-title>
      <mat-card-content>
        <div fxLayout="column" fxLayoutGap="10px">
          <div fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="10px">
            <app-search-box
              fxFlex="65%"
              [searchTerm]="customersFacade.searchTerm$ | async"
              (searchChange)="customersFacade.filterByLastName($event)"
            ></app-search-box>
            <button mat-flat-button color="primary" [routerLink]="['add']">
              Add New Customer
            </button>
          </div>
          <app-customer-list
            fxLayout="row"
            [customers]="customersFacade.customers$ | async"
            [sortBy]="customersFacade.sortBy$ | async"
            (customersSorted)="customersFacade.sortBy($event)"
          ></app-customer-list>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class CustomerListContainerComponent implements OnInit {
  constructor(public customersFacade: CustomersFacade) {}
  ngOnInit(): void {
    this.customersFacade.fetchCustomers();
  }
}
