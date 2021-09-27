import { GetterTree } from 'vuex';
import { StateInterface } from 'src/store';
import { PreferencesInterface } from './state';

const getters: GetterTree<PreferencesInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
