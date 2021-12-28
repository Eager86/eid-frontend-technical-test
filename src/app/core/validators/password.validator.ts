import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasUpper = /[A-Z]/.test(control.value);
    const hasMinlength = /^.{6,}$/.test(control.value);
    const valid = hasMinlength && hasUpper;
    return !valid ? { passwordValidator: { value: control.value } } : null;
  };
}
