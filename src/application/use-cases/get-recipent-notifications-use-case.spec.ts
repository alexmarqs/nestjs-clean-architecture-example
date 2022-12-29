import { InMemoryNotificationsRepository } from '@/infra/database/in-memory/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/notification-factory';
import { GetRecipientNotificationsUseCase } from './get-recipient-notifications-use-case';

describe('GetRecipientNotificationsUseCase', () => {
  it('should get recipent notifications', async () => {
    // given
    const notificationsRepo = new InMemoryNotificationsRepository();

    await notificationsRepo.create(makeNotification({ recipientId: '123' }));

    await notificationsRepo.create(makeNotification({ recipientId: '123' }));

    await notificationsRepo.create(makeNotification({ recipientId: '777' }));

    const getRecipientNotificationsUseCase =
      new GetRecipientNotificationsUseCase(notificationsRepo);

    // when
    const res = await getRecipientNotificationsUseCase.execute({
      recipientId: '123',
    });

    // then
    expect(res.notifications.length).toBe(2);
  });
});
