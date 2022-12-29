import { Content } from '@/application/entities/content';
import { Notification } from '@/application/entities/notification';
import { Notification as PrismaNotification } from '@prisma/client';
export class PrismaNotificationMapper {
  private constructor() {
    throw new Error(
      'PrismaNotificationMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(notification: Notification): PrismaNotification {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt ?? null,
      createdAt: notification.createdAt,
      recipientId: notification.recipientId,
      cancelledAt: notification.canceledAt ?? null,
    };
  }

  public static toDomain(notificationPrismaData: PrismaNotification) {
    return new Notification(
      {
        content: new Content(notificationPrismaData.content),
        category: notificationPrismaData.category,
        readAt: notificationPrismaData.readAt,
        canceledAt: notificationPrismaData.cancelledAt,
        createdAt: notificationPrismaData.createdAt,
        recipientId: notificationPrismaData.recipientId,
      },
      notificationPrismaData.id,
    );
  }
}
