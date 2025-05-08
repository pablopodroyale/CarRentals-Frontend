import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // ajustá si es necesario
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/infraestructure/interceptors/auth.interceptor'; // ajustá si es necesario

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    //provideHttpClient(), // <-- solo esto por ahora

    provideHttpClient(withInterceptors([authInterceptor])) // 👈 interceptor registrado
  ]
};
