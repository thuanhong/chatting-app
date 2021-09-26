import { action, observable } from 'mobx';

export class UserInfoStore {
  @observable
  currentUserInfo = {};

  @action
  setCurrentUserInfo(userInfo) {
    this.currentUserInfo = userInfo;
  }
}
