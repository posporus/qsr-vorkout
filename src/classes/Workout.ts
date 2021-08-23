import Set, { SetNeat } from './Set'
import Exercise from './Exercise'

/*interface WorkoutModel {
    id:number
    name:string
    sets:Array<Set>
}*/
/*
interface Set {
    sets:number
    exercises:Array<Exercise>
}*/
/*
interface Exercise {
    name:string
    reps:number | false
    timer:number | false
}*/
export interface WorkoutNeat {
    id:number | null
    name:string
    sets:Array<SetNeat>
}
export default class Workout {
    id:number | null
    _name:string
    _sets:Array<Set>
    //addSet:void

    constructor() {
        this.id = null
        this._name = ''
        this._sets = []
    }
    /**
     * name
     */
    public set name(v:string) {
        this._name = v;
    }
    
    public get name() : string {
        return this._name
    }
    
    public get sets() : Array<Set> {
        return this._sets
    }

    public get unwrapped():Array<Exercise> {
        return this.unwrap()
    }
    
    /**
     * Methods
     */
    addSet():void {
        const set = new Set
        this._sets.push(set)
        //console.log('add set')
    }
    exportWorkout():WorkoutNeat {
        const sets:Array<SetNeat> = []
        this.sets.forEach((set) => {
            sets.push(set.exportSet())
        })
        return {
            id:this.id,
            name:this.name,
            sets:sets
        }
    }
    importWorkout(workout:WorkoutNeat) {
        this.id = workout.id,
        this.name = workout.name,
        workout.sets.forEach((neatSet) => {
            const set = new Set
            set.importSet(neatSet)
            this.sets.push(set)
        })
    }
    private unwrap() {
        const unwrapped:Array<Exercise> = []
        this.sets.forEach((set) => {
            for(let i=0; i<set.sets; i++) {
                set.exercises.forEach((exercise) => {
                    unwrapped.push(exercise)
                })
            }
        })
        return unwrapped
    }
}