import { CoreState } from '@core/store/core.reducer';
import { createReducer, on } from '@ngrx/store';
import { Customer } from '../../interfaces/customer';
import {
  customersClear,
  loadCustomers,
  loadCustomersError,
  loadCustomersSuccess,
} from '../actions/customers.actions';

export interface CustomersState {
  customers: Customer[] | undefined;
  loading: boolean | undefined;
  loaded: boolean | undefined;
  error: any;
}

export interface CustomersSatateExtends extends CoreState {
  customers: CustomersState;
}

export const initialState: CustomersState = {
  customers: undefined,
  loading: false,
  loaded: false,
  error: undefined,
};

const _customersReducer = createReducer(
  initialState,

  on(loadCustomers, (state) => ({ ...state, loading: true })),

  on(loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers: customers,
    loading: false,
    loaded: true,
    error: undefined,
  })),

  on(loadCustomersError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: {
      name: error.name,
      message: error.message,
    },
  })),

  on(customersClear, (state) => ({
    ...state,
    loading: undefined,
    loaded: undefined,
    customers: undefined,
    error: undefined,
  }))
);

export function customersReducer(state: any, action: any) {
  return _customersReducer(state, action);
}
