import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginPageComponent } from './login-page.component';

class StoreMock {}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Store, useClass: StoreMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login form contains username and password', () => {
    expect(component.loginForm.contains('username')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('Login form contains required username', () => {
    const correoControl = component.loginForm.get('username');
    correoControl?.setValue('');
    expect(correoControl?.valid).toBeFalsy();
  });

  it('Login form contains required password', () => {
    const claveControl = component.loginForm.get('password');
    claveControl?.setValue('');
    expect(claveControl?.valid).toBeFalsy();
  });

  it('Login form contains password with correct format', () => {
    const correoControl = component.loginForm.get('password');
    correoControl?.setValue('Electronicid');
    expect(correoControl?.valid).toBeTruthy();
  });

  it('Login form contains incorrectly formatted password', () => {
    const correoControl = component.loginForm.get('password');
    correoControl?.setValue('electronicid');
    expect(correoControl?.valid).toBeFalsy();
  });
});
