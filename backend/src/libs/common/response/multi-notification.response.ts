import { BaseResponse } from '@src/common/core';
import { Notification } from '@src/entities/notification.entity';

export class MultipleNotificationResponse extends BaseResponse<MultipleNotificationResponse> {
  notification: Notification[];
}
