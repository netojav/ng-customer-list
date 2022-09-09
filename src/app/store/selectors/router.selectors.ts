import { createSelector } from '@ngrx/store';
import { selectRouterModuleState, RouterStateUrl } from '../reducers';
import * as fromRouter from '@ngrx/router-store';

export const selectRouterState = createSelector(
  selectRouterModuleState,
  (state: fromRouter.RouterReducerState<RouterStateUrl>) => {
    return state && state.state;
  }
);

export const {
  selectCurrentRoute, // select the current route
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl // select the current url
} = fromRouter.getSelectors(selectRouterModuleState);
