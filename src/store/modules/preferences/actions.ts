import { ActionTree } from 'vuex';
import { StateInterface } from 'src/store';
import { PreferencesInterface } from './state';

const actions: ActionTree<PreferencesInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
