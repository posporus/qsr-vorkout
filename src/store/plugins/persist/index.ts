import createPersistedState from 'vuex-persistedstate'

const PersistedState = createPersistedState({
  /*
  storage: {
    getItem: (key) => {
      const storage = JSON.parse(localStorage.getItem(key) || '') as unknown
      console.log('getItem', key, storage)
      return storage
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value))
      console.log('setItem', key, value)
    },
    removeItem: (key) => {
      localStorage.removeItem(key)
      console.log('remove item')
    },
  },*/
  key: 'vorkout',
  //paths: ['entities']
});

export default PersistedState;
