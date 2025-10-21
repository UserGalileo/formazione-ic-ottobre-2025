import { Component } from '@angular/core';
import {ActiveUser} from './components/active-user';

// Control flow
@Component({
  selector: 'app-root',
  template: `
    <p>Home</p>
    <hr>

    <app-active-user />
  `,
  imports: [
    ActiveUser
  ]
})
export class App {}
