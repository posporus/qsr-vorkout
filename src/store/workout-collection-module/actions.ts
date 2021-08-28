import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { WorkoutCollection } from './state';
import { WorkoutNeat } from 'src/classes/Workout';

const actions: ActionTree<WorkoutCollection, StateInterface> = {
  addWorkout (context,workout:WorkoutNeat) {
    return context.commit('addWorkout',workout)
  },
  removeWorkout (context,index:number) {
    context.commit('removeWorkout',index)
  },
  changeWorkout (context,{index,changedWorkout}:{index:number;changedWorkout:WorkoutNeat}) {
    context.commit('changeWorkout',{index,changedWorkout})
  },
};

export default actions;
