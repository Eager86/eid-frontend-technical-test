import { ActionReducerMap } from '@ngrx/store';
import * as auth from './reducers/auth.reducer';

export interface CoreState {
  auth: auth.State;
}

export const coreReducers: ActionReducerMap<CoreState> = {
  auth: auth.authReducer,
};
