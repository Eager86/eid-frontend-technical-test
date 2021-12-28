import { Customer } from '@modules/customer/interfaces/customer';
import { createAction, props } from '@ngrx/store';

export const loadCustomers = createAction('[Customers] Load Customers');

export const loadCustomersSuccess = createAction(
  '[Customers] Load Customers Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersError = createAction(
  '[Customers] Load Customers Error',
  props<{ error: any }>()
);

export const customersClear = createAction('[Customers] Customers Clear');
