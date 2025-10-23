import {Component, viewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {ForbiddenValidator} from '../validators/forbidden.validator';

// FormsModule (Template-driven forms)
@Component({
  selector: 'app-home',
  template: `

    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <input forbidden="michele" type="text" ngModel name="firstName" placeholder="first name" #firstName="ngModel">

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

      <div ngModelGroup="address">
        <input type="text" ngModel name="city" placeholder="city">
        <input type="text" ngModel name="street" placeholder="street">
      </div>

      <button type="submit">Submit</button>
    </form>

    Valid: {{ form.valid }}
  `,
  imports: [FormsModule, ForbiddenValidator],
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
export class Home {

  ngForm = viewChild.required(NgForm);

  onSubmit(form: NgForm) {
    form.form.markAsPristine();
  }

  canLeave() {
    if (this.ngForm().form.pristine) return true;

    return confirm('Are you sure you want to leave?');
  }
}

// TODO: Cross-field validation
