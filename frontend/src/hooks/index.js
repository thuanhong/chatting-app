import React from 'react';
import { ContactChatStore } from '@src/stores/contact-chat.store';
import { useLocalStore } from 'mobx-react-lite';

const store = {
  contactChatStore: new ContactChatStore(),
};
const storesContext = React.createContext(store);

export const useGlobalStore = () => {
  const context = React.useContext(storesContext);
  return useLocalStore(() => context);
};
