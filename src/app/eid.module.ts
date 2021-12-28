import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { EidRoutingModule } from './eid-routing.module';
import { EidComponent } from './eid.component';
import { Modules } from './modules';

@NgModule({
  declarations: [EidComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EidRoutingModule,
    CoreModule,
    // modules no lazy load
    Modules,
  ],
  providers: [],
  bootstrap: [EidComponent],
})
export class EidModule {}
