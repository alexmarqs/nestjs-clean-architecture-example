import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty()
  recipientId: string;

  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  category: string;
}
