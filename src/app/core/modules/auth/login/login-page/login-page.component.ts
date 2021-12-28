import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authUser } from '@core/store/actions/auth.actions';
import { CoreState } from '@core/store/core.reducer';
import { passwordValidator } from '@core/validators/password.validator';
import { Store } from '@ngrx/store';

@Component({
  selector: 'core-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public loginForm: FormGroup;

  public readonly WELCOME_TEXT = 'Welcome back';
  public readonly LOGIN_TEXT = 'Login to your account'
  public readonly ERROR_USERNAME_TEXT = 'Username is required';
  public readonly ERROR_PASSWORD_TEXT = 'Password is required minimum six characters and one uppercase';
  public readonly BUTTON_TEXT = 'Login now';

  private readonly USERNAME_FORM_KEY = 'username';
  private readonly PASSWORD_FORM_KEY = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<CoreState>
  ) {
    this.loginForm = this.initializeLoginForm();
  }

  public submit() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        authUser({
          username: this.formValue(this.USERNAME_FORM_KEY),
          password: this.formValue(this.PASSWORD_FORM_KEY),
        })
      );
    }
  }

  private formValue(value: string) {
    return this.loginForm.get(value)?.value;
  }

  private initializeLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }
}
