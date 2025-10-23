import {Directive, ElementRef, inject, input} from '@angular/core';

// Attribute Directive
@Directive({
  selector: '[highlight]',
  host: {
    '(mouseenter)': `highlight(color())`,
    '(mouseleave)': `highlight('')`,
  }
})
export class Highlight {

  color = input('yellow', { alias: 'highlight' });

  el = inject(ElementRef);

  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
