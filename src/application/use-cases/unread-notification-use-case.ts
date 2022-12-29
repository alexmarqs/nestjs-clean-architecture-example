import { Injectable } from '@nestjs/common';
import { NotificationException } from '../exceptions/notification-exception';
import { NotificationRepository } from '../repositories/notifications-repository';
import { UseCase } from './use-case';

export interface UnreadNotificationUseCaseRequest {
  id: string;
}

@Injectable()
export class UnreadNotificationUseCase
  implements UseCase<UnreadNotificationUseCaseRequest, void>
{
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}

  async execute(request: UnreadNotificationUseCaseRequest): Promise<void> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw NotificationException.notFound({ id });
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
