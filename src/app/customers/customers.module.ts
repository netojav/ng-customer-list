import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { containers } from './containers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { components } from './components';
import { HttpClientModule } from '@angular/common/http';
import { CustomerRoutingModule } from './customers-routing.module';
import { services } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    CustomerRoutingModule
  ],
  providers: [...services],
  declarations: [...components, ...containers]
})
export class CustomersModule {}
