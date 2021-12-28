import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CoreState } from './store/core.reducer';

@Component({
  selector: 'core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit, OnDestroy {
  public authorizedUser: boolean;

  private readonly AUTH_STORE_KEY = 'auth';
  private storeSuscription: Subscription | undefined;

  constructor(private store: Store<CoreState>, private toast: ToastrService) {
    this.authorizedUser = false;
  }

  public ngOnInit(): void {
    this.initializeAuthSuscription();
  }

  private initializeAuthSuscription() {
    this.storeSuscription = this.store
      .select(this.AUTH_STORE_KEY)
      .subscribe(({ authUser, error }) => {
        this.authorizedUser = !!authUser;
        if (error) this.toast.error(error.message, error.name);
      });
  }

  public ngOnDestroy(): void {
    this.storeSuscription?.unsubscribe();
  }
}
