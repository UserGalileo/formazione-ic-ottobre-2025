import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li><a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a></li>
      <li><a routerLink="bmi" routerLinkActive="active">Bmi</a></li>
      <li><a routerLink="users" routerLinkActive="active">Users</a></li>
    </ul>
    <hr>
    <router-outlet />

  `,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  styles: `
    .active {
      font-weight: bold;
    }
  `
})
export class App {

}
