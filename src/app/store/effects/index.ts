import { NotificationEffects } from './notification.effects';
import { RouterEffects } from './router.effects';

export const effects: any[] = [RouterEffects, NotificationEffects];

export * from './router.effects';
export * from './notification.effects';
