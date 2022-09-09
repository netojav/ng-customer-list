import { CustomersGeneratorService } from './customers-generator.service';

export function customersGeneratorFactory(provider: CustomersGeneratorService) {
  return () => provider.generateRandomCustomers(100);
}
