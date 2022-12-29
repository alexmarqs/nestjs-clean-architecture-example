import { InMemoryNotificationsRepository } from '@/infra/database/in-memory/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/notification-factory';

import { CountRecipientNotificationsUseCase } from './count-recipient-notifications-use-case';

describe('CountRecipientNotificationsUseCase', () => {
  it('should count recipent notifications', async () => {
    // given
    const notificationsRepo = new InMemoryNotificationsRepository();

    await notificationsRepo.create(makeNotification({ recipientId: '123' }));

    await notificationsRepo.create(makeNotification({ recipientId: '123' }));

    await notificationsRepo.create(makeNotification({ recipientId: '777' }));

    const countRecipientNotificationsUseCase =
      new CountRecipientNotificationsUseCase(notificationsRepo);

    // when
    const count = await countRecipientNotificationsUseCase.execute({
      recipientId: '123',
    });

    // then
    expect(count.count).toBe(2);
  });
});
