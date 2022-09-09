import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer, SortBy } from '@app/customers/types/customer';

@Component({
  selector: 'app-customer-list',
  template: `
    <table
      mat-table
      [dataSource]="dataSource"
      matSort
      [matSortActive]="sortBy.field"
      [matSortDirection]="sortBy.direction"
      (matSortChange)="onSort($event)"
    >
      <ng-container matColumnDef="firstName">
        <th
          mat-header-cell
          *matHeaderCellDef
          mat-sort-header
          sortActionDescription="Sort by First Name"
        >
          First Name
        </th>
        <td mat-cell *matCellDef="let element">{{ element.firstName }}</td>
      </ng-container>
      <ng-container matColumnDef="lastName">
        <th
          mat-header-cell
          *matHeaderCellDef
          mat-sort-header
          sortActionDescription="Sort by Last Name"
        >
          Last Name
        </th>
        <td mat-cell *matCellDef="let element">{{ element.lastName }}</td>
      </ng-container>
      <ng-container matColumnDef="status">
        <th
          mat-header-cell
          *matHeaderCellDef
          mat-sort-header
          sortActionDescription="Sort by Status"
        >
          Status
        </th>
        <td mat-cell *matCellDef="let element">{{ element.status }}</td>
      </ng-container>
      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let element">{{ element.email }}</td>
      </ng-container>
      <ng-container matColumnDef="phone">
        <th mat-header-cell *matHeaderCellDef>Phone</th>
        <td mat-cell *matCellDef="let element">{{ element.phone }}</td>
      </ng-container>
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <a matTooltip="Edit Customer" [routerLink]="[element.id, 'edit']">
            <mat-icon>edit</mat-icon>
          </a>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
    `
  ]
})
export class CustomerListComponent implements OnChanges {
  @Input() customers: Customer[];
  @Input() sortBy: SortBy;

  @Output() customersSorted = new EventEmitter<SortBy>();

  dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.customers.currentValue) {
      this.dataSource = new MatTableDataSource(this.customers);
      this.displayedColumns = [
        'firstName',
        'lastName',
        'status',
        'email',
        'phone',
        'id'
      ];
    }
  }

  onSort(sort: Sort) {
    this.customersSorted.emit({
      field: sort.active,
      direction: sort.direction
    });
  }
}
