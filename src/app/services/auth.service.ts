import {Injectable} from '@angular/core';
import {delay, of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  isLogged() {
    return of(true).pipe(
      delay(500)
    );
  }
}
