import { SendNotificationUseCase } from '@/application/use-cases/send-notification-use-case';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './kafka/controllers/notifications.controller';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotificationUseCase],
  controllers: [NotificationsController],
})
export class MessagingModule {}
