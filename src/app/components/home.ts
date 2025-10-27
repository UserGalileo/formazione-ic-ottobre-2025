import {Component} from '@angular/core';
import {ReactiveForm} from './reactive-form';
import {TemplateForm} from './template-form';

@Component({
  selector: 'app-home',
  template: `
    <!--<app-template-form />-->
    <app-reactive-form />
  `,
  imports: [
    ReactiveForm,
    TemplateForm
  ]
})
export class Home {
}

