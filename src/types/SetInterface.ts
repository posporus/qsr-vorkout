import { ExerciseInterface } from '.';
export default interface SetInterface {
    id?:string
    sets: number
    exercises: Array<ExerciseInterface>
}