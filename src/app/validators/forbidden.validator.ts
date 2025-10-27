import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {Directive, input} from '@angular/core';

// Factory Function
export const forbiddenValidator = (forbiddenValue: any): ValidatorFn => (control) => {
  return control.value === forbiddenValue ? { forbidden: forbiddenValue } : null;
}

@Directive({
  selector: '[forbidden]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenValidator,
      multi: true
    }
  ]
})
export class ForbiddenValidator implements Validator {

  forbidden = input.required<any>();

  validate(control: AbstractControl): ValidationErrors | null {
    return forbiddenValidator(this.forbidden())(control);
  }
}
