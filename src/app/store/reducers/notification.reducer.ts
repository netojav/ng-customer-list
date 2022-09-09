import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/notification.actions';

export interface State {
  notification: {
    message: string;
    setting: {
      manualDismiss: boolean;
    };
  };
}

export const initialState: State = {
  notification: {
    message: null,
    setting: null
  }
};

export const reducer = createReducer(
  initialState,
  on(fromActions.showNotification, (state, action) => ({
    ...state,
    notification: {
      message: action.message,
      setting: {
        manualDismiss: !!action.manualDismiss
      }
    }
  })),
  on(fromActions.notificationDismissed, () => initialState)
);
