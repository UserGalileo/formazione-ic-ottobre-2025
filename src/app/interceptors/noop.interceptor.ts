import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

export function noopInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req);
}
