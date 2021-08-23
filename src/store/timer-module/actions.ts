import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { Timer } from './../../models/timer-model'

const actions: ActionTree<Timer, StateInterface> = {
  countDown (context) {
    context.commit('countDown')
  },
  setTime (context,time) {
    context.commit('setCountdown',time)
    context.commit('setStart',time)
  },
  start(context) {
    context.commit('activate')
  },
  stop(context) {
    context.commit('deactivate')
  },
  toggle(context) {
    if(context.state.active) {
      context.commit('deactivate')
    }
    else {
      context.commit('activate')
    }
    
  }
};

export default actions;
