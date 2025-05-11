import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout/layout.component';
import { AuthGuard } from './infraestructure/interceptors/auth.guard'; // ✔️ corregido

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./presentation/features/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./presentation/features/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./presentation/pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'rentals/create',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./presentation/pages/rentals/rentals-register.component').then(m => m.RegisterRentalComponent),
      },
      {
        path: 'rentals/list',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./presentation/pages/rentals/list/rentals-list.component').then(m => m.RentalsListComponent),
      },
      {
        path: 'rentals/edit/:id',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./presentation/pages/rentals/edit/rentals-edit.component').then(m => m.RentalsEditComponent),
      },
      {
        path: 'stats',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./presentation/pages/statistics/statistics.component').then(m => m.StatisticsComponent),
      },
      {
        path: 'services',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./presentation/pages/services/services.component').then(m => m.ServicesComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
