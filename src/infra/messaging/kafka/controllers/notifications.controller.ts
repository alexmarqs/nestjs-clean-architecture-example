import { SendNotificationUseCase } from '@/application/use-cases/send-notification-use-case';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendNotificationDto } from '../dtos/send-notification-dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  @EventPattern('notifications.send')
  async handleNotificationEvent(@Payload() payload: SendNotificationDto) {
    const { recipientId, category, content } = payload;

    await this.sendNotificationUseCase.execute({
      recipientId,
      category,
      content,
    });
  }
}
