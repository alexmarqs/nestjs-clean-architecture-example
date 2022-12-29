import { ApiProperty } from '@nestjs/swagger';
import { NotificationDto } from './notification-dto';

export class GetRecipientNotificationsDto {
  @ApiProperty({ isArray: true, type: NotificationDto })
  notifications: NotificationDto[];
}
