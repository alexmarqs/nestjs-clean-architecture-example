import { InMemoryNotificationsRepository } from '@/infra/database/in-memory/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/notification-factory';
import { ReadNotificationUseCase } from './read-notification-use-case';

describe('ReadNotificationUseCase', () => {
  it('should read a notification', async () => {
    // given
    const notificationsRepo = new InMemoryNotificationsRepository();

    const newNotification = makeNotification({ recipientId: '123' });
    await notificationsRepo.create(newNotification);

    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepo,
    );

    // when
    await readNotificationUseCase.execute({ id: newNotification.id });

    // then
    const readNotification = await notificationsRepo.findById(
      newNotification.id,
    );

    expect(readNotification?.readAt).toBeInstanceOf(Date);
  });
});
