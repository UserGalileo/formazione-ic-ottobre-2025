import {
  ApplicationConfig, InjectionToken,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';

export const APP_CONFIG = new InjectionToken<Record<string, any>>('APP_CONFIG');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: '/api'
      }
    },
    provideHttpClient(withFetch())
  ]
};
