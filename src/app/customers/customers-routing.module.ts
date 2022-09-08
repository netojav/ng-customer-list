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
      data: { title: 'Covid-19 - Countries Stats' }
    },
    {
      path: 'customers/add',
      component: CustomerAddContainerComponent,
      data: { title: 'Covid-19 - Country Stats Details' }
    },
    {
      path: 'customers/:customerId/edit',
      component: CustomerEditContainerComponent,
      data: { title: 'Covid-19 - Country Stats Details' }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CustomerRoutingModule {}
