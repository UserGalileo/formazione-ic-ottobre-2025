import {Component, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {Post} from '../models/post';
import {User} from '../models/user';

@Component({
  selector: 'app-active-user',
  template: `
    @if (users.isLoading()) {
      Loading...
    } @else {
      <ul>
        @for (user of users.value(); track user.id) {
          <li
            (click)="selectedUserId.set(user.id)"
            [style.font-weight]="selectedUserId() === user.id ? 'bold' : 'normal'"
          >{{ user.name }}
          </li>
        }
      </ul>
    }
    Selected: {{ selectedUserId() }}
    <hr>
    <ul>
      @for (post of posts.value(); track post.id) {
        <li>{{ post.title }}</li>
}
</ul>
  `
})
export class ActiveUser {
  // Stato
  users = httpResource<User[]>(() => 'https://jsonplaceholder.typicode.com/users', { defaultValue: [] });

  // Stato
  selectedUserId = signal<User['id'] | null>(null);

  // Stato derivato asincrono
  posts = httpResource<Post[]>(() => `https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId()}`, { defaultValue: [] })

  // Stato derivato
  // selectedUser = computed(() => this.users().find(user => user.id === this.selectedUserId()));
}
