import { Action, createReducer, on } from '@ngrx/store';
import { AccessControl } from '../../modules/auth/interfaces/access-control';
import { AuthUser } from '../../modules/auth/interfaces/auth-user';
import {
  authAccessControlSuccess,
  authUser,
  authUserClean,
  authUserError,
  authUserSuccess,
} from '../actions/auth.actions';

interface AuthError {
  name: string;
  message: string;
}

export interface State {
  username: string | undefined;
  authUser: AuthUser | undefined;
  accessControl: AccessControl[] | undefined;
  error: AuthError | undefined;
}

export const initialState: State = {
  username: undefined,
  accessControl: undefined,
  authUser: undefined,
  error: undefined,
};

const _authReducer = createReducer(
  initialState,
  on(authUser, (state, { username }) => ({
    ...state,
    username: username,
    error: undefined,
  })),

  on(authUserSuccess, (state, { authUser }) => ({
    ...state,
    authUser: { ...authUser },
    error: undefined,
  })),

  on(authUserError, (state, { error }) => ({
    ...state,
    error: {
      name: error.name,
      message: error.message,
    },
  })),

  on(authAccessControlSuccess, (state, { accessControl }) => ({
    ...state,
    accessControl: { ...accessControl },
    error: undefined,
  })),

  on(authUserClean, (state) => ({
    ...state,
    username: undefined,
    accessControl: undefined,
    authUser: undefined,
    error: undefined,
  }))
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}
