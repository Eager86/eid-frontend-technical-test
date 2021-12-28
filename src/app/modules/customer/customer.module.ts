import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '@core/modules/angular-material/angular-material.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ShareModule } from '@shared/share.module';
import { AuthModule } from '../../core/modules/auth/auth.module';
import { CustomerListPageComponent } from './customer-list-page/customer-list-page.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { EffectsArray } from './store/effects';
import { customersReducer } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    CustomerRoutingModule,
    AuthModule,
    AngularMaterialModule,
    StoreModule.forFeature('customers', customersReducer),
    EffectsModule.forFeature(EffectsArray),
  ],
  exports: [],
  declarations: [CustomerListPageComponent],
  providers: [],
})
export class CustomerModule {}
