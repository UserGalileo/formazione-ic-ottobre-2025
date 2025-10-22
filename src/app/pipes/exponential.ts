import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'exponential',
  pure: true // default
})
export class Exponential implements PipeTransform {

  transform(value: number, exponent = 1): number {
    return Math.pow(value, exponent);
  }
}
