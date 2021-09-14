import { preset } from './Preset';

export default interface ExerciseOptions {
    preset:preset
    reps?:number | false
    time?:number | false
}