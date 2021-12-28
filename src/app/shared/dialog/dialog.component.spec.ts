import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Address,
  Company,
  Customer,
  Geo,
} from '../../modules/customer/interfaces/customer';
import { DialogComponent } from './dialog.component';

class MatDialogRefMock {}

const addressMocK: Address = {
  streetA: '',
  streetB: '',
  streetC: '',
  streetD: '',
  city: '',
  state: '',
  country: '',
  zipcode: '',
  geo: {} as Geo,
};

const customerMock: Customer = {
  name: '',
  username: '',
  email: '',
  address: addressMocK,
  phone: '',
  website: '',
  company: {} as Company,
  posts: [],
  accountHistory: [],
  subject: '',
};

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    component.data = customerMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
