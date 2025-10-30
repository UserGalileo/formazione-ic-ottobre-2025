import {Component} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {User} from '../../models/user';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  template: `
    <ul>
      @for (user of users.value(); track user.id) {
        <li><a [routerLink]="'/users/' + user.id">{{ user.name }}</a></li>
      }
    </ul>

    <router-outlet />
  `
})
export class Users {

  users = httpResource<User[]>(() => 'https://jsonplaceholder.typicode.com/users', { defaultValue: [] });
}
