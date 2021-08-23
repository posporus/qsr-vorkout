import { Module } from 'vuex';
import { StateInterface } from '../index';
import state from './state';
import { Timer } from './../../models/timer-model'

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const workoutModule: Module<Timer, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default workoutModule;
