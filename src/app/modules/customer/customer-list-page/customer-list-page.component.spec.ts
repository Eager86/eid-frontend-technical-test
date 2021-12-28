import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of, Subscription } from 'rxjs';
import { CustomerListPageComponent } from './customer-list-page.component';

class MatDialogMock {}
class StoreMock {
  select() {
    return of();
  }
  dispatch() {}
  subscribe() {}
}
class ToastrServiceMock {}

describe('CustomerListPageComponent', () => {
  let component: CustomerListPageComponent;
  let fixture: ComponentFixture<CustomerListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerListPageComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: Store, useClass: StoreMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component['storeSuscription'] = new Subscription();
    spyOn(component['storeSuscription'], 'unsubscribe');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
