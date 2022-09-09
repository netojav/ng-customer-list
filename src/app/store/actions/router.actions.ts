import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const go = createAction(
  '[Router] Go',
  props<{
    path: string[];
    query?: { [key: string]: any };
    extras?: NavigationExtras;

    /**
     * Not a standard param in Router, for debug in redux dev tool.
     * Helpful to explain things like:
     * - Purpose of redirection.
     * - Code which trigger the redirect.
     */
    reason?: string;
  }>()
);

export const back = createAction('[Router] Back');

export const forward = createAction('[Router] Forward');

export const redirect404Error = createAction(
  '[Router] Redirect To 404 Error Page'
);

export const redirected404Error = createAction(
  '[Router] Redirected To 404 Error Page'
);
