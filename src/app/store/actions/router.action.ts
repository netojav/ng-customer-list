import { Action, createAction, union } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;

      /**
       * Not a standard param in Router, for debug in redux dev tool.
       * Helpful to explain things like:
       * - Purpose of redirection.
       * - Code which trigger the redirect.
       */
      reason?: string;
    }
  ) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export const redirect404Error = createAction(
  '[Router] Redirect To 404 Error Page'
);

export const redirected404Error = createAction(
  '[Router] Redirected To 404 Error Page'
);

const allActionCreators = union({
  redirect404Error,
  redirected404Error
});

export type Actions = Go | Back | Forward | typeof allActionCreators;
