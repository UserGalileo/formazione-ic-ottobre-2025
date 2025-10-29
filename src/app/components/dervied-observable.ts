import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {BehaviorSubject, combineLatest, map} from 'rxjs';

@Component({
  selector: 'app-derived-observable',
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  template: `
    A: {{ a$ | async }} <button (click)="a$.next(a$.getValue() + 1)">+</button><br>
    B: {{ b$ | async }} <button (click)="b$.next(b$.getValue() + 1)">+</button><br>

    C: {{ c$ | async | json }}
  `
})
export class DerivedObservable {

  a$ = new BehaviorSubject(0);
  b$ = new BehaviorSubject(0);

  c$ = combineLatest([this.a$, this.b$]).pipe(
    map(([a, b]) => a + b)
  );
}
