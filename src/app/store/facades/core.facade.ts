import { Injectable } from '@angular/core';
import * as fromActions from '../actions';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '../selectors/router.selectors';
import { NavigationExtras } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CoreFacade {
  params$ = this.store.select(selectRouteParams);

  initApp() {
    this.store.dispatch(fromActions.applicationInit());
  }

  goTo(
    path: any[],
    query?: { [key: string]: any },
    extras?: NavigationExtras,
    reason?: string
  ) {
    this.store.dispatch(
      fromActions.go({
        path: path,
        query: query,
        extras: extras,
        reason: reason
      })
    );
  }

  back() {
    this.store.dispatch(fromActions.back());
  }

  constructor(private store: Store) {}
}
