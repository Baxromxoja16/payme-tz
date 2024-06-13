import { Routes } from '@angular/router';
import { loginGuard } from './auth/guards/login.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'auth', pathMatch: 'full',
  },
  {
    path: 'auth', loadComponent:() => import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'main', canActivate: [loginGuard] , loadComponent:() => import('./main/todo/todo.component').then((m) => m.TodoComponent),
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full',
  },
];
