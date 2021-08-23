import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { Timer } from './../../models/timer-model'

const getters: GetterTree<Timer, StateInterface> = {
  active(state) {
    return state.active
  }
};

export default getters;