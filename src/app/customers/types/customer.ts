export enum CustomerStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  INACTIVE = 'inactive'
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  status: CustomerStatus;
  email: string;
  phone?: string;
}
export type CustomerData = Omit<Customer, 'id'>;

export interface SortBy {
  field: 'firstName' | 'lastName' | 'status';
  direction: 'asc' | 'desc';
}
