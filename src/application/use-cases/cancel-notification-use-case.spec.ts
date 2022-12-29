import { InMemoryNotificationsRepository } from '@/infra/database/in-memory/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/notification-factory';
import { CancelNotificationUseCase } from './cancel-notification-use-case';

describe('CancelNotificationUseCase', () => {
  it('should cancel a notification', async () => {
    // given
    const notificationsRepo = new InMemoryNotificationsRepository();

    const newNotification = makeNotification({ recipientId: '123' });
    await notificationsRepo.create(newNotification);

    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepo,
    );

    // when
    await cancelNotificationUseCase.execute({ id: newNotification.id });

    // then
    const canceledNotification = await notificationsRepo.findById(
      newNotification.id,
    );

    expect(canceledNotification?.canceledAt).toBeInstanceOf(Date);
  });
});
