import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout/layout.component';

export const routes: Routes = [
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
        loadComponent: () =>
          import('./presentation/pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'rentals',
        loadComponent: () =>
          import('./presentation/pages/rentals/rentals.component').then(m => m.RentalsComponent),
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('./presentation/pages/statistics/statistics.component').then(m => m.StatisticsComponent),
      },
      {
        path: 'services',
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
