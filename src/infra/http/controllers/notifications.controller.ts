import { CountRecipientNotificationsUseCase } from '@/application/use-cases/count-recipient-notifications-use-case';
import { UnreadNotificationUseCase } from '@/application/use-cases/unread-notification-use-case';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationUseCase } from '@/application/use-cases/send-notification-use-case';

import { CreateNotificationDto } from '../dtos/create-notification-dto';
import { NotificationsMapper } from '../mappers/notifications-mapper';
import { ReadNotificationUseCase } from '@/application/use-cases/read-notification-use-case';
import { GetRecipientNotificationsUseCase } from '@/application/use-cases/get-recipient-notifications-use-case';
import { CancelNotificationUseCase } from '@/application/use-cases/cancel-notification-use-case';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetRecipientNotificationsDto } from '../dtos/get-recipients-notifications-dto';
import { GetNotificationsCountRecipientDto } from '../dtos/get-notifications-count-recipient-dto';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly unreadNotificationUseCase: UnreadNotificationUseCase,
    private readonly readNotificationUseCase: ReadNotificationUseCase,
    private readonly cancelNotificationUseCase: CancelNotificationUseCase,
    private readonly getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
    private readonly countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The notification has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() body: CreateNotificationDto) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationsMapper.toDto(notification) };
  }

  @Patch(':id/read')
  @ApiResponse({
    status: 200,
    description: 'The notification has been successfully read.',
  })
  @ApiResponse({
    status: 404,
    description: 'The notification was not found.',
  })
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ id });
  }

  @Patch(':id/unread')
  @ApiResponse({
    status: 200,
    description: 'The notification has been successfully unread.',
  })
  @ApiResponse({
    status: 404,
    description: 'The notification was not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ id });
  }

  @Patch(':id/cancel')
  @ApiResponse({
    status: 200,
    description: 'The notification has been successfully canceled.',
  })
  @ApiResponse({
    status: 404,
    description: 'The notification was not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ id });
  }

  @Get('recipients/:recipientId/count')
  @ApiResponse({
    status: 200,
    description: "Count the recipient's notifications.",
    type: GetNotificationsCountRecipientDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async countByRecipientId(
    @Param('recipientId') recipientId: string,
  ): Promise<GetNotificationsCountRecipientDto> {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return { count };
  }

  @Get('recipients/:recipientId')
  @ApiResponse({
    status: 200,
    description: "Get the recipient's notifications.",
    type: GetRecipientNotificationsDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async listByRecipientId(
    @Param('recipientId') recipientId: string,
  ): Promise<GetRecipientNotificationsDto> {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return {
      notifications: notifications.map(NotificationsMapper.toDto),
    };
  }

  @Get('health')
  @ApiResponse({
    status: 200,
    description: 'Health check.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async health() {
    return { status: 'OK' };
  }
}
