import { Module } from 'vuex';
import { StateInterface } from '../index';
import state from './state';
import { WorkoutCollection } from './state';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const workoutModule: Module<WorkoutCollection, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default workoutModule;
