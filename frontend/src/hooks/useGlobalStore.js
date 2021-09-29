import React from 'react';
import { ContactChatStore } from '@src/stores/contact-chat.store';
import { useLocalStore } from 'mobx-react-lite';
import { GroupChatStore } from '@src/stores/instant-group-chat.store';

const store = {
  contactChatStore: new ContactChatStore(),
  groupChatStore: new GroupChatStore(),
};
const storesContext = React.createContext(store);

export const useGlobalStore = () => {
  const context = React.useContext(storesContext);
  return useLocalStore(() => context);
};
