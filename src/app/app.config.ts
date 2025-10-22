import {
  ApplicationConfig, InjectionToken,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';

export const APP_CONFIG = new InjectionToken<Record<string, any>>('APP_CONFIG');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: '/api'
      }
    },
    provideHttpClient()
  ]
};
