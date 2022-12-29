import { Injectable } from '@nestjs/common';
import { NotificationException } from '../exceptions/notification-exception';
import { NotificationRepository } from '../repositories/notifications-repository';
import { UseCase } from './use-case';

export interface ReadNotificationUseCaseRequest {
  id: string;
}

@Injectable()
export class ReadNotificationUseCase
  implements UseCase<ReadNotificationUseCaseRequest, void>
{
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}

  async execute(request: ReadNotificationUseCaseRequest): Promise<void> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw NotificationException.notFound({ id });
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
