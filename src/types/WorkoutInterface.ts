import { SetInterface } from '.';
export default interface WorkoutInterface {
    id?:string
    name:string
    sets:Array<SetInterface>
}