import { action, observable } from 'mobx';

export class GroupChatStore {
  @observable
  currentGroupChatInfo = {};

  @action
  setCurrentGroupChatInfo(instantChatInfo) {
    this.currentGroupChatInfo = instantChatInfo;
  }
}
