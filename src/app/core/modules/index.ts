import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './layout/layout.module';

export const CoreModules = [
  LayoutModule,
  AuthModule,
  HomeModule,
  AngularMaterialModule,
];
