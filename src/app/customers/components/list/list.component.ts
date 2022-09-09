import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer, SortBy } from '@app/customers/types/customer';

@Component({
  selector: 'app-customer-list',
  template: `
    <div class="container  mat-elevation-z5">
      <div class="table-container">
        <mat-table
          [dataSource]="dataSource"
          matSort
          [matSortActive]="sortBy.field"
          [matSortDirection]="sortBy.direction"
          (matSortChange)="onSort($event)"
        >
          <ng-container matColumnDef="firstName">
            <mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              sortActionDescription="Sort by First Name"
            >
              First Name
            </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <span class="mobile-label">First Name:</span>
              {{ element.firstName }}
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="lastName">
            <mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              sortActionDescription="Sort by Last Name"
            >
              Last Name
            </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <span class="mobile-label">Last Name:</span>
              {{ element.lastName }}
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="status">
            <mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              sortActionDescription="Sort by Status"
            >
              Status
            </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <span class="mobile-label">Status:</span> {{ element.status }}
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="email">
            <mat-header-cell *matHeaderCellDef>Email</mat-header-cell>
            <mat-cell *matCellDef="let element">
              <span class="mobile-label">Email:</span> {{ element.email }}
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="phone">
            <mat-header-cell *matHeaderCellDef>Phone</mat-header-cell>
            <mat-cell *matCellDef="let element">
              <span class="mobile-label">Phone:</span> {{ element.phone }}
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef></mat-header-cell>
            <mat-cell *matCellDef="let element">
              <span class="mobile-label">actions:</span>
              <a
                mat-icon-button
                color="accent"
                matTooltip="Edit Customer"
                [routerLink]="[element.id, 'edit']"
              >
                <mat-icon>edit</mat-icon>
              </a>
            </mat-cell>
          </ng-container>
          <mat-header-row
            *matHeaderRowDef="displayedColumns; sticky: true"
          ></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
        </mat-table>
      </div>
      <mat-paginator
        [length]="customerLength"
        [pageSize]="20"
        [pageSizeOptions]="[20, 40, 60]"
        showFirstLastButtons
        (page)="onPageChange($event)"
      ></mat-paginator>
    </div>
  `,
  styleUrls: ['./list.component.scss']
})
export class CustomerListComponent implements OnChanges {
  @Input() customers: Customer[];
  @Input() sortBy: SortBy;
  @Input() customerLength: number;

  @Output() customersSorted = new EventEmitter<SortBy>();
  @Output() pageChange = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
  }>();

  dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = [];
  totalRows = 0;

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
      this.totalRows = this.customers.length;
    }
  }

  onSort(sort: Sort) {
    this.customersSorted.emit({
      field: sort.active,
      direction: sort.direction
    });
  }
  onPageChange(pageEvent: PageEvent) {
    const { pageIndex, pageSize } = pageEvent;
    this.pageChange.emit({ pageIndex, pageSize });
  }
}
