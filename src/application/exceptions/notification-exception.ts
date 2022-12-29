import { HttpException, HttpStatus } from '@nestjs/common';

export class NotificationException extends HttpException {
  details?: Record<string, unknown>;

  private constructor(
    message: string,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Record<string, unknown>,
  ) {
    super(message, status);
    this.details = details;

    HttpException.captureStackTrace(this, NotificationException);
  }

  public static notFound(
    details?: Record<string, unknown>,
  ): NotificationException {
    return new NotificationException(
      'Notification not found',
      HttpStatus.NOT_FOUND,
      details,
    );
  }
}
