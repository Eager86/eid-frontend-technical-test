import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';
import {
  authAccessControlSuccess,
  authUser,
  authUserError,
  authUserSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthUserEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  authUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authUser),
      mergeMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((authUser) => authUserSuccess({ authUser: authUser })),
          catchError((error) => of(authUserError({ error: error })))
        )
      )
    )
  );

  authAccessControl$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authUserSuccess),
      mergeMap(() =>
        this.authService
          .accessControls()
          .pipe(
            map((accessControl) =>
              authAccessControlSuccess({ accessControl: accessControl })
              // TODO: Controlar error
            )
          )
      )
    )
  );
}
