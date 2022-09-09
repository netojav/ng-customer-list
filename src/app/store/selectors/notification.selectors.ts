import { createSelector } from '@ngrx/store';
import { selectNotificationState } from '../reducers';

export const selectMessage = createSelector(
  selectNotificationState,
  state => state.notification
);
