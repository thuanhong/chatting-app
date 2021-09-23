import React from 'react';
import { ContactChatStore } from '@src/stores/contact-chat.store';
import { UserInfoStore } from '@src/stores/user-info.store';
import { useLocalStore } from 'mobx-react-lite';

const store = {
  contactChatStore: new ContactChatStore(),
  userInfoStore: new UserInfoStore(),
};
const storesContext = React.createContext(store);

export const useGlobalStore = () => {
  const context = React.useContext(storesContext);
  return useLocalStore(() => context);
};
