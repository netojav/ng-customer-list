import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as coreActions from '../actions/core.actions';
import { filter, map, switchMap } from 'rxjs/operators';
import { notificationDismissed } from '../actions/notification.actions';
import * as fromNotification from '../selectors/notification.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationEffects {
  showNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coreActions.applicationInit),
      switchMap(() => this.store.select(fromNotification.selectMessage)),
      filter(m => !!m.message),
      switchMap(result => {
        let snackBarRef;
        if (result.setting && result.setting.manualDismiss) {
          snackBarRef = this.snackBar.open(result.message, 'Close');
        } else {
          snackBarRef = this.snackBar.open(result.message, '', {
            duration: 2000
          });
        }
        return snackBarRef.afterDismissed();
      }),
      map(() => notificationDismissed())
    )
  );

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private actions$: Actions
  ) {}
}
