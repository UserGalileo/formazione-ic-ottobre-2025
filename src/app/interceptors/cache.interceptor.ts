import {HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, startWith, tap} from 'rxjs';
import { environment as env } from '../../environments/environment';
import {inject, InjectionToken} from '@angular/core';

const cache = new Map<string, any>();

export const CACHE_VERSION = new InjectionToken<'V1' | 'V2'>('V1 oppure V2');

export function cacheInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

  const version = inject(CACHE_VERSION);

  if (!isCacheable(req)) {
    return next(req);
  }

  const cachedResponse = cache.get(req.urlWithParams);

  if (version === 'V1') {
    // V1 - Return cache if present
    return cachedResponse
      ? of(cachedResponse)
      : sendRequest(req, next);
  } else {
    // V2 - Return cache first, then request
    return cachedResponse
      ? sendRequest(req, next).pipe(startWith(cachedResponse))
      : sendRequest(req, next);
  }
}

function sendRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  return next(req).pipe(
    tap(res => {
      if (res instanceof HttpResponse) {
        cache.set(req.urlWithParams, res);
      }
    })
  )
}


function isCacheable(req: HttpRequest<unknown>) {
  return req.method === 'GET';
}
