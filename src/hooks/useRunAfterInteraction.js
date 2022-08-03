import {useEffect} from 'react';
import {InteractionManager} from 'react-native';

export const useRunAfterInteraction = f => {
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      f?.();
    });
  }, []);
};
