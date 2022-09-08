import { Injectable } from '@angular/core';
import * as actions from '../actions/router.action';
import { Store } from '@ngrx/store';
import { selectParams } from '../selectors/router.selector';

@Injectable({ providedIn: 'root' })
export class RouterFacade {
  params$ = this.store.select(selectParams);
  goTo(path: any[], query?: object, extras?: any, reason?: string) {
    this.store.dispatch(
      new actions.Go({
        path: path,
        query: query,
        extras: extras,
        reason: reason
      })
    );
  }

  constructor(private store: Store) {}
}
