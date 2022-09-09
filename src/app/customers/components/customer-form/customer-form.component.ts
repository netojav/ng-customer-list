import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer, CustomerStatus } from '@app/customers/types/customer';

@Component({
  selector: 'app-customer-form',
  template: `
    <form fxFlex="100%" fxLayout="column" fxLayoutGap="10px" [formGroup]="form">
      <div
        fxLayout="row"
        fxLayout.xs="column"
        fxLayoutAlign.xs="start"
        fxLayoutAlign="start start"
        fxLayoutGap="10px"
      >
        <mat-form-field fxFlex="50%" fxFlex.xs="100%">
          <mat-label>First Name</mat-label>
          <input matInput formControlName="firstName" required />
          <mat-error *ngIf="firstNameField.hasError('required')"
            >Field is Required</mat-error
          >
        </mat-form-field>
        <mat-form-field fxFlex="50%" fxFlex.xs="100%">
          <mat-label>Last Name</mat-label>
          <input matInput formControlName="lastName" required />
          <mat-error *ngIf="lastNameField.hasError('required')"
            >Field is Required</mat-error
          >
        </mat-form-field>
      </div>
      <div
        fxLayout="row"
        fxLayout.xs="column"
        fxLayoutAlign.xs="start"
        fxLayoutAlign="start start"
        fxLayoutGap="10px"
      >
        <mat-form-field fxFlex="50%" fxFlex.xs="100%">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status" required>
            <mat-option *ngFor="let status of statuses" [value]="status">{{
              status | titlecase
            }}</mat-option>
          </mat-select>
          <mat-error *ngIf="statusField.hasError('required')"
            >Field is Required</mat-error
          >
        </mat-form-field>

        <mat-form-field fxFlex="50%" fxFlex.xs="100%">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" required />
          <mat-error *ngIf="emailField.hasError('required')"
            >Field is Required</mat-error
          >
          <mat-error *ngIf="emailField.hasError('email')"
            >invalid email address</mat-error
          >
        </mat-form-field>
      </div>
      <div
        fxLayout="row"
        fxLayout.xs="column"
        fxLayoutAlign.xs="start"
        fxLayoutAlign="start start"
        fxLayoutGap="10px"
      >
        <mat-form-field fxFlex="50%" fxFlex.xs="100%">
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone" />
          <mat-error *ngIf="phoneField.hasError('pattern')"
            >Invalid phone number</mat-error
          >
        </mat-form-field>
      </div>

      <div
        fxFlex="100%"
        fxLayout="row"
        fxLayoutAlign="end center"
        fxLayoutGap="10px"
      >
        <button mat-stroked-button (click)="cancel.emit()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          (click)="onSave()"
          [disabled]="form.invalid"
        >
          Save Customer
        </button>
      </div>
    </form>
  `
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: Customer;
  @Output() save = new EventEmitter<Customer>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;
  statuses = Object.values(CustomerStatus);
  constructor(private formBuilder: FormBuilder) {}
  get firstNameField() {
    return this.form.get('firstName');
  }
  get lastNameField() {
    return this.form.get('lastName');
  }
  get statusField() {
    return this.form.get('status');
  }
  get emailField() {
    return this.form.get('email');
  }
  get phoneField() {
    return this.form.get('phone');
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [this.customer?.firstName, Validators.required],
      lastName: [this.customer?.lastName, Validators.required],
      status: [this.customer?.status, Validators.required],
      email: [this.customer?.email, [Validators.required, Validators.email]],
      phone: [
        this.customer?.phone,
        Validators.pattern(
          /^(\+?\d{1,2}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        )
      ]
    });
  }

  onSave() {
    if (this.form.valid) {
      const customer = {
        ...(this.customer && { id: this.customer.id }),
        ...this.form.value
      };
      this.save.emit(customer);
    }
  }
}
