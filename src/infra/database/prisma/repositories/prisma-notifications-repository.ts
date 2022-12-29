import { Injectable } from '@nestjs/common';
import { Notification } from '@/application/entities/notification';
import { NotificationRepository } from '@/application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notifications-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const notificationPrismaData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: notificationPrismaData,
    });
  }

  async findById(id: string): Promise<Notification | null> {
    const notificationPrismaData =
      await this.prismaService.notification.findUnique({
        where: { id },
      });

    if (!notificationPrismaData) {
      return null;
    }

    const notification = PrismaNotificationMapper.toDomain(
      notificationPrismaData,
    );

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationPrismaData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: { id: notification.id },
      data: notificationPrismaData,
    });
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    const prismaNotificationData =
      await this.prismaService.notification.findMany({
        where: { recipientId },
      });

    const notifications = prismaNotificationData.map(
      PrismaNotificationMapper.toDomain,
    );

    return notifications;
  }
}
