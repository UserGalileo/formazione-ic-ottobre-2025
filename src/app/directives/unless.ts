import {Directive, effect, inject, input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[unless]',
})
export class Unless {

  templateRef = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef);

  unless = input(true);

  constructor() {
    effect(() => {
      if (this.unless()) {
        this.viewContainer.clear();
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
