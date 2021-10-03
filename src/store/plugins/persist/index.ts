import createPersistedState from 'vuex-persistedstate'
//import { Storage } from '@capacitor/storage';

const PersistedState = createPersistedState({
/*
  storage: {
    getItem: async (key: string) => {
      return await Storage.get({ key: key });
    },
    setItem: async (key: string, value: string) => {
      await Storage.set({ key: key, value: value });
    },
    removeItem: async (key: string) => {
      await Storage.remove({ key: key });
    },
  },*/
  key: 'vorkout',
  //paths: ['entities']
});

export default PersistedState;
