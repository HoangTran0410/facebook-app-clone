import create from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createUiSlice} from './uiSlice';

export const useStore = create(
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
