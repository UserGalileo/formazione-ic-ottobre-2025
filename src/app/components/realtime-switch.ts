import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {interval, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-realtime-switch',
  imports: [
    FormsModule
  ],
  template: `
    <select [(ngModel)]="status">
      <option value="ON">On</option>
      <option value="OFF">Off</option>
    </select>
  `
})
export class RealtimeSwitch {
  status = signal<'ON' | 'OFF'>('OFF');

  socket$ = interval(1000);

  constructor() {
    toObservable(this.status).pipe(
      switchMap(status => status === 'ON' ? this.socket$ : []),
    ).subscribe(data => console.log(data))
  }
}
