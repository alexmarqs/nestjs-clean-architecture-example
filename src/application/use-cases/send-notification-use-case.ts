import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notifications-repository';
import { UseCase } from './use-case';

export interface SendNotificationUseCaseRequest {
  recipientId: string;
  content: string;
  category: string;
}

export interface SendNotificationUseCaseResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase
  implements
    UseCase<SendNotificationUseCaseRequest, SendNotificationUseCaseResponse>
{
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}

  async execute(
    request: SendNotificationUseCaseRequest,
  ): Promise<SendNotificationUseCaseResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
