import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { ContactChatStore } from '@src/stores/contact-chat.store';
import { GroupChatStore } from '@src/stores/instant-group-chat.store';
import { NotificationStore } from '@src/stores/notification.store';

const store = {
  contactChatStore: new ContactChatStore(),
  groupChatStore: new GroupChatStore(),
  notificationStore: new NotificationStore(),
};
const storesContext = React.createContext(store);

export const useGlobalStore = () => {
  const context = React.useContext(storesContext);
  return useLocalStore(() => context);
};
