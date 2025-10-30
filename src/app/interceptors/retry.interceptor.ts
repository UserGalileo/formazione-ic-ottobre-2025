import {HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, retry} from 'rxjs';

export const RETRY_COUNT = new HttpContextToken(() => 3);

export function retryInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

  const retryCount = req.context.get(RETRY_COUNT);

  return next(req).pipe(
    retry(retryCount)
  );
}
