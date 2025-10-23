import {Component, input} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [
    JsonPipe
  ],
  template: `
    {{ user.value() | json }}
  `
})
export class User {

  userId = input.required<string>();

  user = httpResource<User>(() => `https://jsonplaceholder.typicode.com/users/${this.userId()}`);

}
