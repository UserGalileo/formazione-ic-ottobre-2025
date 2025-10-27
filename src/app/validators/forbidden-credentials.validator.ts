import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {Directive, input} from '@angular/core';

export const forbiddenCredentialsValidator = (forbiddenValues: [string, string]): ValidatorFn => (control) => {

  const firstName = control.get('firstName')?.value;
  const lastName = control.get('lastName')?.value;

  if (firstName === forbiddenValues[0] && lastName === forbiddenValues[1]) {
    return {
      forbiddenCredentials: `${firstName} ${lastName} is forbidden.`
    }
  }
  return null;
}

@Directive({
  selector: '[forbiddenCredentials]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenCredentialsValidator,
      multi: true
    }
  ]
})
export class ForbiddenCredentialsValidator implements Validator {

  forbiddenCredentials = input<[string, string]>();

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.forbiddenCredentials()) {
      return null;
    }
    return forbiddenCredentialsValidator(this.forbiddenCredentials()!)(control);
  }
}
