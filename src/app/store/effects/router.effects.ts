import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as RouterActions from '../actions/router.actions';

import { tap, map, switchMap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.go),
        map(action => action),
        tap(({ path, query: queryParams, extras }) => {
          this.router.navigate(path, { queryParams, ...extras });
        })
      ),
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.forward),
        tap(() => this.location.forward())
      ),
    { dispatch: false }
  );

  redirectTo404Error$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.redirect404Error),
      switchMap(() =>
        this.router
          .navigate(['/not-found'], {
            skipLocationChange: true
          })
          .then(() => RouterActions.redirected404Error())
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
