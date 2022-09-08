import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { environment } from '@env/environment';
import { CustomersModule } from './customers/customers.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShellModule } from './shell/shell.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { customersGeneratorFactory } from '@app/customers/services/customers-generator.factory';
import { CustomersGeneratorService } from '@app/customers/services/customers-generator.service';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ShellModule,
    CustomersModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: customersGeneratorFactory,
      deps: [CustomersGeneratorService],
      multi: true
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
