// https://github.com/pmndrs/zustand/blob/main/docs/persisting-store-data.md

import {useEffect, useState} from 'react';
import {useStore} from '../store/store';

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // const unsubHydrate = useStore.persist.onHydrate(() => setHydrated(false)); // Note: this is just in case you want to take into account manual rehydrations. You can remove this if you don't need it/don't want it.
    const unsubFinishHydration = useStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    setHydrated(useStore.persist.hasHydrated());

    return () => {
      //   unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
