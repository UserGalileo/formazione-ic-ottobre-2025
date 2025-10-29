import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  pipe,
  ObservableInput, OperatorFunction
} from 'rxjs';
import {CityService} from '../services/city.service';
import {toSignal} from '@angular/core/rxjs-interop';

const liveSearch = <I, O>(time: number, fn: (term: I) => ObservableInput<O>): OperatorFunction<I, O> => pipe(
  debounceTime(time),
  distinctUntilChanged(),
  switchMap((x: I) => fn(x))
);

@Component({
  selector: 'app-search-form',
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <input type="text" placeholder="City..." [formControl]="control">

    <ul>
      @for (suggestion of suggestions(); track suggestion) {
        <li>{{ suggestion }}</li>
      }
    </ul>
  `
})
export class SearchForm {

  cityService = inject(CityService);

  control = new FormControl('', { nonNullable: true });

  suggestions = toSignal(this.control.valueChanges.pipe(
    liveSearch(500, term => term ? this.cityService.getSuggestions(term) : of([]))
  ), { initialValue: [] });
}

// mergeMap (parallelo)
// concatMap (coda)
// switchMap (passa alla nuova)
// exhaustMap (continua la vecchia) -> GET senza parametri
