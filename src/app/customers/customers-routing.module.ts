import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { CustomerListContainerComponent } from './containers/list/list.component';
import { CustomerAddContainerComponent } from './containers/add/add.component';
import { CustomerEditContainerComponent } from './containers/edit/edit.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/customers', pathMatch: 'full' },
    {
      path: 'customers',
      component: CustomerListContainerComponent,
      data: { title: 'Customers' }
    },
    {
      path: 'customers/add',
      component: CustomerAddContainerComponent,
      data: { title: 'Add new customer' }
    },
    {
      path: 'customers/:customerId/edit',
      component: CustomerEditContainerComponent,
      data: { title: 'Edit Customer' }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CustomerRoutingModule {}
