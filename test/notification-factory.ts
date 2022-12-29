import { Content } from '@/application/entities/content';
import {
  NotificationProps,
  Notification,
} from '@/application/entities/notification';

export const makeNotification = (
  overrides: Partial<NotificationProps> = {},
): Notification => {
  return new Notification({
    recipientId: '123',
    content: new Content('Hello World'),
    category: 'social',
    ...overrides,
  });
};
