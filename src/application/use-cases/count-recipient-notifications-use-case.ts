import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';
import { UseCase } from './use-case';

export interface CountRecipientNotificationsUseCaseRequest {
  recipientId: string;
}

export interface CountRecipientNotificationsUseCaseResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotificationsUseCase
  implements
    UseCase<
      CountRecipientNotificationsUseCaseRequest,
      CountRecipientNotificationsUseCaseResponse
    >
{
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}

  async execute(
    request: CountRecipientNotificationsUseCaseRequest,
  ): Promise<CountRecipientNotificationsUseCaseResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countByRecipientId(
      recipientId,
    );

    return { count };
  }
}
