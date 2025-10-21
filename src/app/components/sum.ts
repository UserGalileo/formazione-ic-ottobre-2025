import {Component, input} from '@angular/core';

@Component({
  selector: 'app-sum',
  template: `
    Sum: {{ a() }} + {{ b () }} = {{ a() + b() }}
  `
})
export class Sum {

  a = input.required<number>();
  b = input.required<number>();
}
