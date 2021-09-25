import { preset } from '.';
export default interface ExerciseNeat {
    id:string
    name?:string
    preset:preset
    reps?:number
    time?:number
}