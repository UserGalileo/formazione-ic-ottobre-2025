import {Component, viewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe, KeyValuePipe} from '@angular/common';
import {ForbiddenCredentialsValidator} from '../validators/forbidden-credentials.validator';
import {Counter} from './counter';

// (Template-driven forms)
@Component({
  selector: 'app-template-form',
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)" [forbiddenCredentials]="['mario', 'rossi']">
      <input type="text" ngModel name="firstName" placeholder="first name" #firstName="ngModel">

      @if (firstName.invalid && (firstName.dirty || firstName.touched)) {
        <div class="alert">
          @if (firstName.hasError('required')) {
            <p>Name is required.</p>
          }
          @if (firstName.hasError('minlength')) {
            <p>Name must be at least 3 characters long.</p>
          }
          @if (firstName.hasError('forbidden')) {
            <p>{{ firstName.getError('forbidden') }} is forbidden.</p>
          }
        </div>
      }

      <input type="text" ngModel name="lastName" placeholder="last name">

      <app-counter [ngModel]="0" name="age" />

      <div ngModelGroup="address">
        <input type="text" ngModel name="city" placeholder="city">
        <input type="text" ngModel name="street" placeholder="street">
      </div>

      <button type="submit">Submit</button>


      @if (form.invalid) {
        <div class="alert">
          @for (error of form.errors | keyvalue; track error.key) {
            <li>{{ error.value }}</li>
          }
        </div>
      }

    </form>
  `,
  imports: [
    FormsModule,
    KeyValuePipe,
    ForbiddenCredentialsValidator,
    ReactiveFormsModule,
    Counter,
  ],
  styles: `
    .ng-dirty {
      border-color: orange;
    }

    .alert {
      padding: 1em;
      border: 1px solid red;
    }
  `
})
export class TemplateForm {

  ngForm = viewChild.required(NgForm);

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.form.markAsPristine();
  }

  canLeave() {
    if (this.ngForm().form.pristine) return true;

    return confirm('Are you sure you want to leave?');
  }
}
