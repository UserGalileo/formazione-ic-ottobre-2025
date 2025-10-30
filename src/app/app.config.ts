import {
  ApplicationConfig, ErrorHandler, Injectable, InjectionToken,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {noopInterceptor} from './interceptors/noop.interceptor';
import {CACHE_VERSION, cacheInterceptor} from './interceptors/cache.interceptor';
import {retryInterceptor} from './interceptors/retry.interceptor';

export const APP_CONFIG = new InjectionToken<Record<string, any>>('APP_CONFIG');

@Injectable()
class MyErrorHandler implements ErrorHandler {

  handleError(error: any) {
    // do something with the error...
    console.error(error);
  }
}

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
    provideHttpClient(
      withFetch(),
      withInterceptors([noopInterceptor, cacheInterceptor, retryInterceptor])
    ),
    {
      provide: CACHE_VERSION,
      useValue: 'V1'
    },
    {
      provide: ErrorHandler,
      useClass: MyErrorHandler
    }
  ]
};

