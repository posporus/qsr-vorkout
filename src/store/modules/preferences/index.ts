import { Module } from 'vuex';
import { StateInterface } from 'src/store';
import state, { PreferencesInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const preferencesModule: Module<PreferencesInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default preferencesModule;
