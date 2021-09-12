import React from 'react';
import { storesContext } from '@src/contexts/';

export const useStores = () => React.useContext(storesContext);
