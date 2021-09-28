import { preset } from '.';
export default interface ExerciseInterface {
    id?:string
    preset?:preset
    isRest?:true
    reps?:number
    time?:number
}