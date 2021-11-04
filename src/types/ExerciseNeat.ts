import { preset } from '.';
export default interface ExerciseNeat {
    key?:string
    id:string
    name?:string
    preset:preset
    reps?:number
    time?:number
}