import { Injectable } from '@nestjs/common';
import { NotificationException } from '../exceptions/notification-exception';
import { NotificationRepository } from '../repositories/notifications-repository';
import { UseCase } from './use-case';

export interface CancelNotificationUseCaseRequest {
  id: string;
}

@Injectable()
export class CancelNotificationUseCase
  implements UseCase<CancelNotificationUseCaseRequest, void>
{
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}

  async execute(request: CancelNotificationUseCaseRequest): Promise<void> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw NotificationException.notFound({ id });
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
