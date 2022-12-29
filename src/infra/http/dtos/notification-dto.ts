import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  readAt: Date | null | undefined;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  recipientId: string;
}
