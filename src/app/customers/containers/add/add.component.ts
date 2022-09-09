import { Component, OnInit } from '@angular/core';
import { CustomersFacade } from '@app/customers/store/customers.facade';
import { CoreFacade } from '@app/store/facades/core.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
@UntilDestroy()
@Component({
  selector: 'app-customer-add-container',
  template: `
    <mat-card class="container mat-elevation-z0">
      <mat-card-title>Add New Customer</mat-card-title>
      <mat-card-content>
        <div fxLayout="column" fxLayoutGap="10px">
          <app-customer-form
            fxLayout="row"
            (save)="customersFacade.add($event)"
            (cancel)="coreFacade.back()"
          ></app-customer-form>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class CustomerAddContainerComponent implements OnInit {
  constructor(
    public customersFacade: CustomersFacade,
    public coreFacade: CoreFacade
  ) {}
  ngOnInit(): void {
    this.customersFacade.customers$
      .pipe(
        untilDestroyed(this),
        filter(_ => !_)
      )
      .subscribe(_ => this.customersFacade.fetchCustomers());
  }
}
