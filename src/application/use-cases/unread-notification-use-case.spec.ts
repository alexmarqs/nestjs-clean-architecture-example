import { InMemoryNotificationsRepository } from '@/infra/database/in-memory/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/notification-factory';
import { UnreadNotificationUseCase } from './unread-notification-use-case';

describe('UnreadNotificationUseCase', () => {
  it('should unread a notification', async () => {
    // given
    const notificationsRepo = new InMemoryNotificationsRepository();

    const newNotification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepo.create(newNotification);

    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepo,
    );

    // when
    await unreadNotificationUseCase.execute({ id: newNotification.id });

    // then
    const unreadNotification = await notificationsRepo.findById(
      newNotification.id,
    );

    expect(unreadNotification?.readAt).toBeNull();
  });
});
