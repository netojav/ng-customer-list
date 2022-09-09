import { createAction, props } from '@ngrx/store';



export const showNotification = createAction(
  '[Notifications] Show Notification Requested',
  props<{ message: string; manualDismiss?: boolean }>()
);

export const notificationDismissed = createAction(
  '[Notifications] Notification Dismissed'
);
