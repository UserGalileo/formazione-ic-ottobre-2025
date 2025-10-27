import {Component, effect, model, signal} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Component({
  selector: 'app-counter',
  template: `
    <span [class.danger]="count() < 0">{{ count() }}</span>
    <button [disabled]="isDisabled()" type="button" (click)="inc()" aria-label="increment button">+</button>
    <button [disabled]="isDisabled()" type="button" (click)="dec()" aria-label="decrement button">-</button>
  `,
  styles: `
    .danger {
      color: red;
      font-weight: bold;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Counter,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: Counter,
      multi: true
    }
  ]
})
export class Counter implements ControlValueAccessor, Validator {

  count = model(0);

  onChange = (count: number) => {}
  onTouched = () => {}
  isDisabled = signal(false);

  constructor() {
    effect(() => {
      this.onChange(this.count());
      this.onTouched();
    });
  }

  inc() {
    this.count.update(n => n + 1);
  }

  dec() {
    this.count.update(n => n - 1);
  }

  writeValue(value: any) {
    this.count.set(+value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled.set(isDisabled);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value < 0 ? { negativeCounter: true } : null;
  }
}
