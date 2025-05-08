import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from '../../car-rentals-frontend/src/app.config'; // Adjust the path as necessary

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
