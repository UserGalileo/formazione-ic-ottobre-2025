import {Component, inject, input} from '@angular/core';
import {BetterLogger, Logger} from '../services/logger';
import {APP_CONFIG} from '../app.config';

@Component({
  selector: 'app-sum',
  template: `
    Sum: {{ a() }} + {{ b () }} = {{ a() + b() }}
  `,
  providers: [
    {
      provide: Logger,
      useClass: BetterLogger
    }
  ]
})
export class Sum {

  logger = inject(Logger);
  config = inject(APP_CONFIG);

  a = input.required<number>();
  b = input.required<number>();

  constructor() {
    this.logger.log('sum');
    console.log(this.config);
  }
}
