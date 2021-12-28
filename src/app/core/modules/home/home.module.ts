import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  imports: [CommonModule, LayoutModule, RouterModule],
  exports: [HomePageComponent],
  declarations: [HomePageComponent],
  providers: [],
})
export class HomeModule {}
