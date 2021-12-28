import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../core/modules/angular-material/angular-material.module';
import { DialogComponent } from './dialog/dialog.component';
import { ConcatPipe } from './pipes/concat.pipe';
import { InitialsPipe } from './pipes/initials.pipe';

@NgModule({
  imports: [AngularMaterialModule],
  exports: [DialogComponent, InitialsPipe, ConcatPipe],
  declarations: [DialogComponent, InitialsPipe, ConcatPipe],
  providers: [],
})
export class ShareModule {}
