import { TestBed } from '@angular/core/testing';
import { Customer } from '../types/customer';
import { CustomersGeneratorService } from './customers-generator.service';
import { CustomersLocalStorageService } from './customers-local-storage.service';
import { generateRandomCustomer } from './fixtures';

class CustomersLocalStorageServiceMock {
  updateStorage(length = 20) {}
  get customers(): Customer[] {
    return null;
  }
}

describe('CustomerGenerator', () => {
  let customerGeneratorService: CustomersGeneratorService;
  let customerLocalStorageService: CustomersLocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomersGeneratorService,
        {
          provide: CustomersLocalStorageService,
          useClass: CustomersLocalStorageServiceMock
        }
      ]
    });

    customerGeneratorService = TestBed.inject(CustomersGeneratorService);
    customerLocalStorageService = TestBed.inject(CustomersLocalStorageService);
  });

  it('should create an instance', () => {
    expect(customerGeneratorService).toBeDefined();
  });

  it('should create customers if storage is empty', () => {
    spyOn(customerLocalStorageService, 'updateStorage');
    customerGeneratorService.generateRandomCustomers();
    expect(customerLocalStorageService.updateStorage).toHaveBeenCalled();
  });

  it('should not create customers when storage exists', () => {
    spyOn(customerLocalStorageService, 'updateStorage');
    const mockData = [generateRandomCustomer()];

    spyOnProperty(
      customerLocalStorageService,
      'customers',
      'get'
    ).and.returnValue(mockData);

    customerGeneratorService.generateRandomCustomers();
    expect(customerLocalStorageService.updateStorage).not.toHaveBeenCalled();
  });
});
