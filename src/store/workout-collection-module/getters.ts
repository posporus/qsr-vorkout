import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { WorkoutCollection } from './state';

const getters: GetterTree<WorkoutCollection, StateInterface> = {
  getCollection(state) {
    return state.collection
  },
  getWorkout: (state) => (id:number) => {
    return state.collection[id]
  },
  getLength: (state) => {
    return state.collection.length
  }
};

export default getters;