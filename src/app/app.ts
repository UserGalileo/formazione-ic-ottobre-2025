import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Sum} from './components/sum';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li><a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a></li>
      <li><a routerLink="bmi" routerLinkActive="active">Bmi</a></li>
      <li><a routerLink="counter" routerLinkActive="active">Counter</a></li>
      <li><a routerLink="users" routerLinkActive="active">Users</a></li>
    </ul>
    <hr>
    <router-outlet />

  `,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Sum
  ],
  styles: `
    .active {
      font-weight: bold;
    }
  `
})
export class App {

}
