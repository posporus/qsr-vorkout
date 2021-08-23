import { Timer } from './../../models/timer-model'

function state(): Timer {
    return {
        active: false,
        start: 0,
        countdown: 0,
    }
};
  
export default state;