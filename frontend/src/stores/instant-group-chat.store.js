import { action, observable } from 'mobx';

export class GroupChatStore {
  @observable
  currentGroupChatInfo = {};

  @action
  setCurrentGroupChatInfo(instantChatInfo) {
    console.log(instantChatInfo)
    this.currentGroupChatInfo = instantChatInfo;
  }
}
