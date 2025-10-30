import {Component, ElementRef, viewChild} from '@angular/core';


@Component({
  selector: 'app-card',
  template: `
    <ng-content select=".card-header"/>
    <hr>
    <ng-content/>

    <input type="text" #el (input)="onInput()">
  `,
  styles: `
    :host {
      display: block;
      padding: 1em;
      border: 1px solid black;
      border-radius: 3px;
    }
  `
})
export class Card {

  inputElement = viewChild.required<ElementRef<HTMLInputElement>>('el');

  onInput() {}

}
