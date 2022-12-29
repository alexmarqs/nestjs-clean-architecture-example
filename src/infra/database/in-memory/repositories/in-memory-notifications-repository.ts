import { Notification } from '@/application/entities/notification';
import { NotificationRepository } from '@/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository implements NotificationRepository {
  private notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notifications;
  }

  async findById(id: string): Promise<Notification | null> {
    return this.notifications.find((n) => n.id === id) ?? null;
  }

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === notification.id);

    this.notifications[index] = notification;
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    const filtered = this.notifications.filter(
      (n) => n.recipientId === recipientId,
    );

    return filtered.length;
  }

  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((n) => n.recipientId === recipientId);
  }
}
