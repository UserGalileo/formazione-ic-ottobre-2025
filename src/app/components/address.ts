import {Component, inject, Injector} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR, NgControl,
  NonNullableFormBuilder,
  ReactiveFormsModule, TouchedChangeEvent,
  ValueChangeEvent
} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-address',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="form">
      <h2>Address</h2>
      <input type="text" formControlName="street" placeholder="your street">
      <input type="text" formControlName="nr" placeholder="your address nr">
    </form>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Address,
      multi: true
    }
  ]
})
export class Address implements ControlValueAccessor {

  // Utile per far vedere errori del controllo sul form padre
  ngControl: NgControl | null = null;

  injector = inject(Injector);

  sub: Subscription;
  onChange = (obj: any) => {};
  onTouched = () => {};

  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    street: '',
    nr: ''
  });

  constructor() {
    this.sub = this.form.events.subscribe(event => {
      if (event instanceof ValueChangeEvent) {
        this.onChange(event.value);
      }
      if (event instanceof TouchedChangeEvent && event.touched) {
        this.onTouched();
      }
    });
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  writeValue(obj: any) {
    this.form.setValue(obj);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
