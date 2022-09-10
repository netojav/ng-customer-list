import { TestBed } from '@angular/core/testing';
import { omit } from 'lodash';
import { CUSTOMERS_COLLECTION } from '../constants';
import { CustomersLocalStorageService } from './customers-local-storage.service';
import { generateRandomCustomer, generateRandomCustomers } from './fixtures';
import { LocalStorageRefService } from './local-storage-ref.service';

class LocalStorageRefServiceMock {
  get localStorage() {
    return window.localStorage;
  }
}

describe('CustomersLocalStorageService', () => {
  let customerLocalStorageService: CustomersLocalStorageService;
  let localStorageRefService: LocalStorageRefService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomersLocalStorageService,
        {
          provide: LocalStorageRefService,
          useClass: LocalStorageRefServiceMock
        }
      ]
    });
    localStorageRefService = TestBed.inject(LocalStorageRefService);
    localStorageRefService.localStorage.clear();
  });
  it('should create an instance', () => {
    customerLocalStorageService = TestBed.inject(CustomersLocalStorageService);
    expect(customerLocalStorageService).toBeDefined();
  });

  it('should return customers in the storage', done => {
    const mockData = generateRandomCustomers();
    localStorageRefService.localStorage.setItem(
      CUSTOMERS_COLLECTION,
      JSON.stringify(mockData)
    );
    customerLocalStorageService = TestBed.inject(CustomersLocalStorageService);

    customerLocalStorageService.customers$.subscribe(value => {
      expect(value).toEqual(mockData);
      done();
    });
  });

  it('should add a new customer to storage', async done => {
    customerLocalStorageService = TestBed.inject(CustomersLocalStorageService);
    const mockData = generateRandomCustomer();
    const customer = await customerLocalStorageService.add(
      omit(mockData, 'id')
    );

    customerLocalStorageService.customers$.subscribe(value => {
      const [newCustomer] = value;
      expect(newCustomer).toEqual(customer);
      done();
    });
  });

  it('should edit customer in the storage', async done => {
    const mockData = generateRandomCustomers(5);
    localStorageRefService.localStorage.setItem(
      CUSTOMERS_COLLECTION,
      JSON.stringify(mockData)
    );
    const [editCustomer] = mockData;
    customerLocalStorageService = TestBed.inject(CustomersLocalStorageService);

    editCustomer.email = 'test@testing.com';

    await customerLocalStorageService.edit(editCustomer);

    customerLocalStorageService.customers$.subscribe(customers => {
      const editedCustomerInStore = customers.find(
        _ => _.id == editCustomer.id
      );
      expect(editedCustomerInStore).toEqual(editCustomer);
      done();
    });
  });
});
