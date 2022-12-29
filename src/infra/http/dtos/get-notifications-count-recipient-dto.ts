import { ApiProperty } from '@nestjs/swagger';

export class GetNotificationsCountRecipientDto {
  @ApiProperty()
  count: number;
}
