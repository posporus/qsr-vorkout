import { WorkoutNeat } from './../../classes/Workout'
export interface WorkoutCollection {
    collection:Array<WorkoutNeat>
}
function state():WorkoutCollection {
    return {
        collection:JSON.parse(localStorage.getItem('workouts') || '[]') as Array<WorkoutNeat>
        //collection:init()
    }
};

export default state;