import {
  AbstractControl, AsyncValidator,
  AsyncValidatorFn, NG_ASYNC_VALIDATORS,
} from '@angular/forms';
import {Directive, input} from '@angular/core';

function getFromServer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('mario');
    }, 1000)
  });
}

export const forbiddenAsyncValidator: AsyncValidatorFn = (control) => {
  return getFromServer().then(forbiddenValue => {
    return control.value === forbiddenValue ? { forbidden: forbiddenValue } : null;
  });
}

@Directive({
  selector: '[forbiddenAsync]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ForbiddenAsyncValidator,
      multi: true
    }
  ]
})
export class ForbiddenAsyncValidator implements AsyncValidator {

  forbiddenAsync = input.required<any>();

  validate(control: AbstractControl) {
    return forbiddenAsyncValidator(control);
  }
}
