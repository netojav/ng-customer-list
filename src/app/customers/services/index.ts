import { CustomersGeneratorService } from './customers-generator.service';
import { CustomersLocalStorageService } from './customers-local-storage.service';
import { LocalStorageRefService } from './local-storage-ref.service';

export const services = [
  CustomersGeneratorService,
  LocalStorageRefService,
  CustomersLocalStorageService
];
