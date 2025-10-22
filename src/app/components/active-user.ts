import {Component, computed, signal} from '@angular/core';
import {JsonPipe} from '@angular/common';

interface User {
  id: number;
  name: string;
  surname: string;
}

@Component({
  selector: 'app-active-user',
  imports: [
    JsonPipe
  ],
  template: `
    <ul>
      @for (user of users(); track user.id) {
        <li
          (click)="selectedUserId.set(user.id)"
          [style.font-weight]="selectedUserId() === user.id ? 'bold' : 'normal'"
        >{{ user.name }} {{ user.surname }}
        </li>
      }
    </ul>
    Selected: {{ selectedUserId() }}
    <hr>
    {{ selectedUser() | json }}
  `
})
export class ActiveUser {

  // Stato
  users = signal<User[]>([
    { id: 1, name: 'Michele', surname: 'Stieven' },
    { id: 2, name: 'Mario', surname: 'Rossi' },
  ]);

  // Stato
  selectedUserId = signal<User['id'] | null>(null);

  // Stato derivato
  selectedUser = computed(() => this.users().find(user => user.id === this.selectedUserId()));

}
