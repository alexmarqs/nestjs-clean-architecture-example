import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { NotificationRepository } from '../../application/repositories/notifications-repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
})
export class DatabaseModule {}
