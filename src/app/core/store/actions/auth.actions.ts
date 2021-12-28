import { createAction, props } from '@ngrx/store';
import { AccessControl } from '../../modules/auth/interfaces/access-control';
import { AuthUser } from '../../modules/auth/interfaces/auth-user';

export const authUser = createAction(
  '[AuthUser] Authentication User',
  props<{ username: string; password: string }>()
);

export const authUserSuccess = createAction(
  '[AuthUser] Authentication User Success',
  props<{ authUser: AuthUser }>()
);

export const authUserError = createAction(
  '[AuthUser] Authentication User Error',
  props<{ error: any }>()
);

export const authAccessControlSuccess = createAction(
  '[AuthUser] Authentication Access Contrl Success',
  props<{ accessControl: AccessControl[] }>()
);

export const authUserClean = createAction(
  '[AuthUser] Authentication User Clean'
);
