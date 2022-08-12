import create from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createUiSlice} from './uiSlice';
import {createSelectors} from './createSelectors';

export const useStoreBase = create(
  immer(
    persist(
      (set, get) => ({
        // some state here
        ...createUiSlice(set, get),
      }),
      {
        name: 'facebookclone-storage',
        getStorage: () => AsyncStorage,
      },
    ),
  ),
);

// export const useStore = createSelectors(useStoreBase);
