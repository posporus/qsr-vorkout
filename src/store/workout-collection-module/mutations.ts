import { MutationTree } from 'vuex';
import { WorkoutCollection } from './state'
import { WorkoutNeat } from './../../classes/Workout'

const mutation: MutationTree<WorkoutCollection> = {
  addWorkout (state:WorkoutCollection,workout:WorkoutNeat) {
    return state.collection.push(workout)
  },
  removeWorkout (state:WorkoutCollection,index:number) {
    state.collection.splice(index,1)
  },
  changeWorkout (state:WorkoutCollection,{index,changedWorkout}:{index:number;changedWorkout:WorkoutNeat}) {
    state.collection.splice(index,1,changedWorkout)
  },
};

export default mutation;