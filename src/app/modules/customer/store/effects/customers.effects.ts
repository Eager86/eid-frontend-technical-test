import { Injectable } from '@angular/core';
import { CustomersService } from '@modules/customer/services/customers.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  loadCustomers,
  loadCustomersError,
  loadCustomersSuccess,
} from '../actions/customers.actions';

@Injectable()
export class CustomersEffects {
  constructor(
    private actions$: Actions,
    private customersService: CustomersService
  ) {}

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCustomers),
      mergeMap(() =>
        this.customersService.getCustomers().pipe(
          map((customers) => loadCustomersSuccess({ customers: customers })),
          catchError((error) => of(loadCustomersError({ error: error })))
        )
      )
    )
  );
}
