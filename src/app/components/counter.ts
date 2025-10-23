import {Component, model} from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <span [class.danger]="count() < 0">{{ count() }}</span>
    <button type="button" (click)="inc()" aria-label="increment button">+</button>
    <button type="button" (click)="dec()" aria-label="decrement button">-</button>
  `,
  styles: `
    .danger {
      color: red;
      font-weight: bold;
    }
  `
})
export class Counter {

  count = model(0);

  inc() {
    this.count.update(n => n + 1);
  }

  dec() {
    this.count.update(n => n - 1);
  }
}
