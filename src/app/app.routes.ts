import { Routes } from '@angular/router';
import {Home} from './components/home';
import {Counter} from './components/counter';
import {authGuard} from './guards/auth.guard';
import {canLeaveGuard} from './guards/can-leave.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
    canDeactivate: []
  },
  {
    path: 'bmi',
    loadComponent: () => import('./components/bmi').then(m => m.Bmi),
    providers: []
  },
  {
    path: 'counter',
    component: Counter
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes'),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
