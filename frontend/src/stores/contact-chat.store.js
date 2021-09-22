import { action, observable } from 'mobx';

export class ContactChatStore {
  @observable
  currentUserChattingInfo = {};

  @action
  setCurrentUserChattingInfo(userInfo) {
    this.currentUserChattingInfo = userInfo;
  }
}
