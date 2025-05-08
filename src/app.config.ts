import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../src/app/app.routes'; // Adjust the path as necessary
// import { routes } from './app/routes'; // Adjust the path as necessary

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
