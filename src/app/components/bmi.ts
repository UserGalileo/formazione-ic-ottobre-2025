import {ChangeDetectionStrategy, Component, computed, effect, linkedSignal, signal} from '@angular/core';

@Component({
  selector: 'app-bmi',
  template: `
    <label>
      Altezza
      <input type="number" step="0.01" [value]="h()" (input)="onHeightChange($event)">
    </label><br>

    <label>
      Peso
      <input type="number" [value]="w()" (input)="onWeightChange($event)">
    </label>

    {{ status() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Bmi {

  // Stati
  w = signal(100);
  h = signal(1.80);

  // Stati derivati (computati)
  bmi = computed(() => this.w() / this.h() ** 2);

  status = computed(() => {
    if (isNaN(this.bmi())) return '-';
    if (this.bmi() < 18.5) return 'sottopeso';
    if (this.bmi() < 25) return 'normopeso';
    return 'sovrappeso';
  });

  onHeightChange(e: Event) {
    this.h.set(+(e.target as HTMLInputElement).value || 0);
  }

  onWeightChange(e: Event) {
    this.w.set(+(e.target as HTMLInputElement).value || 0);
  }

}
