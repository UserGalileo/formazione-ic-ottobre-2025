import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, FormRecord,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators, ValueChangeEvent
} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {forbiddenAsyncValidator} from '../validators/forbidden-async.validator';
import {Counter} from './counter';
import {Address} from './address';


@Component({
  selector: 'app-reactive-form',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="firstName" placeholder="your name">
      <input type="text" formControlName="lastName" placeholder="your surname">

      <app-counter formControlName="age" />

      <app-address formControlName="address" />

      <div formArrayName="phones">
        <h2>Phones</h2>
        <button type="button" (click)="addPhone()">Add phone</button>

        @for (phone of profileForm.controls.phones.controls; track phone; let i = $index) {
            <div>
              <input type="text" [formControlName]="i">
              <button type="button" (click)="removePhone(i)">Remove</button>
            </div>
        }
      </div>

      <button>submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule, Counter, Address]
})
export class ReactiveForm {

  fb = inject(NonNullableFormBuilder);
  cd = inject(ChangeDetectorRef);

  /*
  profileForm = new FormGroup({
    firstName: new FormControl('Mario'),
    lastName: new FormControl('Rossi'),
    address: new FormGroup({
      street: new FormControl(''),
      nr: new FormControl(''),
    })
  });
  */

  profileForm = this.fb.group({
    firstName: ['', [], [forbiddenAsyncValidator]],
    lastName: '',
    age: 0,
    address: {
      street: '',
      nr: ''
    },
    phones: this.fb.array<FormControl<string>>([])
  }, {
    // validators: [forbiddenCredentialsValidator(['mario', 'rossi'])]
  });

  constructor() {
    // this.profileForm.valueChanges.subscribe(value => {
      // ???
      // ???
      // this.profileForm.patchValue({}, { emitEvent: false })
    // })

    setTimeout(() => {
      this.profileForm.patchValue({
        address: {
          street: 'a',
          nr: 'b',
        }
      })
    }, 1000)
  }

  onSubmit() {
    console.log(this.profileForm.value)
  }

  addPhone() {
    this.profileForm.controls.phones.push(this.fb.control(''));
  }

  removePhone(i: number) {
    this.profileForm.controls.phones.removeAt(i);
  }

}
