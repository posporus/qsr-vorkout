import { ExerciseInterface } from '.';
export default interface SetInterface {
    id?:string
    key?:string
    sets: number
    exercises: Array<ExerciseInterface>
}