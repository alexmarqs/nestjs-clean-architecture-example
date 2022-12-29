import { InMemoryNotificationsRepository } from '@/infra/database/in-memory/repositories/in-memory-notifications-repository';
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
} from './send-notification-use-case';

describe('SendNotificationUseCase', () => {
  it('should create a notification', async () => {
    // given
    const notificationsRepo = new InMemoryNotificationsRepository();
    const sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepo,
    );

    const request: SendNotificationUseCaseRequest = {
      recipientId: '123',
      content: 'Hello World',
      category: 'social',
    };

    // when
    const response = await sendNotificationUseCase.execute(request);

    // then
    expect(response.notification.recipientId).toEqual(request.recipientId);
    expect(response.notification.content.value).toEqual(request.content);
    expect(response.notification.category).toEqual(request.category);
    expect(response.notification.createdAt).toBeInstanceOf(Date);
    expect(notificationsRepo.findAll()).resolves.toEqual([
      response.notification,
    ]);
  });
});
