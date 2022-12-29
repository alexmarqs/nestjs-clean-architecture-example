import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notifications-repository';
import { UseCase } from './use-case';

export interface GetRecipientNotificationsRequest {
  recipientId: string;
}

export interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase
  implements
    UseCase<
      GetRecipientNotificationsRequest,
      GetRecipientNotificationsResponse
    >
{
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications = await this.notificationsRepository.findByRecipientId(
      recipientId,
    );

    return { notifications };
  }
}
