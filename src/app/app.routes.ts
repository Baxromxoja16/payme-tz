import { Routes } from '@angular/router';
import { loginGuard } from './auth/guards/login.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'auth', pathMatch: 'full',
  },
  {
    path: 'auth', loadChildren:() => import('./auth/auth.routes').then((m) => m.Auth_Routes),
  },
  {
    path: 'main', canActivate: [loginGuard], loadChildren:() => import('./main/main.routes').then((m) => m.Main_Routes),
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full',
  },
];
