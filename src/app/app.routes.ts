import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'todo', pathMatch: 'full',
  },
  {
    path: '', loadComponent:() => import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full',
  },
];
