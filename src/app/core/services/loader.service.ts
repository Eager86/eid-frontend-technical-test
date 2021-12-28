import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private spinnerTopRef: OverlayRef;
  private visibleSpinner: boolean;
  private spin$: Subject<boolean>;
  private counter: number;

  constructor(private overlay: Overlay) {
    this.spinnerTopRef = this.cdkSpinnerCreate();
    this.visibleSpinner = false;
    this.spin$ = new Subject();
    this.counter = 0;
    this.initializeSpinner();
  }

  public show(): void {
    this.counter++;
    if (this.counter === 1) {
      this.visibleSpinner = true;
      this.spinnerTopRef.attach(new ComponentPortal(MatSpinner));
    }
  }

  public hide(): void {
    this.counter--;
    if (this.counter === 0) {
      this.visibleSpinner = false;
      this.spinnerTopRef.detach();
    }
  }

  public toogle(): void {
    if (this.visibleSpinner) {
      this.hide();
    } else {
      this.show();
    }
  }

  private cdkSpinnerCreate(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
  }

  private initializeSpinner(): void {
    this.spin$
      .asObservable()
      .pipe(
        map((val) => (val ? 1 : -1)),
        scan((acc, one) => (acc + one >= 0 ? acc + one : 0), 0)
      )
      .subscribe((res) => {
        if (res === 1) {
          this.show();
        } else if (res === 0 && this.spinnerTopRef.hasAttached()) {
          this.hide();
        }
      });
  }
}
