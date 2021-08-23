import { MutationTree } from 'vuex';
import { Timer } from './../../models/timer-model'

const mutation: MutationTree<Timer> = {
  countDown (state:Timer) {
    state.countdown--
  },
  setCountdown (state:Timer, time:number) {
    state.countdown = time
  },
  
  setStart (state:Timer, time:number) {
    state.start = time
  },
  activate (state:Timer) {
    if(state.countdown > 0) {
      state.active = true
    }
  },
  deactivate (state:Timer) {
    state.active = false
  }
};

export default mutation;