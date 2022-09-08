import { CUSTOMERS_COLLECTION } from '../constants';
import { CustomersGeneratorService } from './customers-generator.service';

export function customersGeneratorFactory(provider: CustomersGeneratorService) {
  if (!localStorage[CUSTOMERS_COLLECTION]) {
    return () => provider.generateRandomCustomers(100);
  }
  return null;
}
