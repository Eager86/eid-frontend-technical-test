import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AccessControlDirective } from './directives/access-control.directive';
import { LoginPageComponent } from './login/login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  exports: [LoginPageComponent, AccessControlDirective],
  declarations: [LoginPageComponent, AccessControlDirective],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
