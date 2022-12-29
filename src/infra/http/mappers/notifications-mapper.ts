import { Notification } from '@/application/entities/notification';
import { NotificationDto } from '../dtos/notification-dto';

export class NotificationsMapper {
  private constructor() {
    throw new Error(
      'NotificationsMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(notification: Notification): NotificationDto {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      recipientId: notification.recipientId,
    };
  }
}
