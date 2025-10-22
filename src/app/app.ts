import {Component, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  template: `
  `,
  imports: [
  ]
})
export class App {

  http = inject(HttpClient);

  constructor() {

    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(console.log)
  }
}
