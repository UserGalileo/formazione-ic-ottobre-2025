import {Routes} from '@angular/router';
import {Users} from './users';
import {User} from './user';

export default [
  {
    path: '',
    component: Users,
    children: [
      {
        path: ':userId',
        component: User,
      }
    ]
  }
] satisfies Routes;
