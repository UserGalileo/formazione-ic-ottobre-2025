import {CanDeactivateFn} from '@angular/router';

export const canLeaveGuard: CanDeactivateFn<any> = (component) => {
  return component.canLeave();
}
