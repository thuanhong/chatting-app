import { action, observable } from 'mobx';

export class NotificationStore {
  @observable
  newNotificationList = [];

  @observable
  numberNotification = 0;

  @action
  updateNewNotificationList(newNotification) {
    this.newNotification.push(newNotification);
    this.numberNotification++;
  }

  @action
  setNumberNotification(newNumber) {
    this.numberNotification = newNumber;
  }
}
