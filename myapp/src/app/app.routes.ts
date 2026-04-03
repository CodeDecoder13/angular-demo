import { Routes } from '@angular/router';
import { AuthLayout } from '@layouts/auth-layout/auth-layout';
import { MainLayout } from '@layouts/main-layout/main-layout';
import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    component: AuthLayout,
    canActivate: [guestGuard],
    loadChildren: () => import('@features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'dashboard',
    component: MainLayout,
    canActivate: [authGuard],
    loadChildren: () => import('@features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
];
