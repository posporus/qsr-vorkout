import Set, { SetNeat } from './Set'
import Exercise from './Exercise'
import _ from 'lodash'

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
    id:string
    name:string
    sets:Array<SetNeat>
}
export default class Workout {
    id:string
    _name:string
    _sets:Array<Set>
    //addSet:void

    constructor() {
        this.id = ''
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
        let exerciseCount = 1
        this.sets.forEach((set) => {
            for(let i=0; i<set.sets; i++) {
                set.exercises.forEach((_exercise) => {
                    /*
                    const exercise = new Exercise

                    exercise._id=_exercise._id,
                    exercise._name=_exercise._name,
                    exercise._reps=_exercise._reps,
                    exercise._time=_exercise._time,
                    exercise._preset=_exercise._preset,
                    exercise._meta=_exercise._meta

                    exercise.exerciseCount = index + 1
                    exercise.setCount = i + 1
                   */
                  const exercise:Exercise = _.cloneDeep(_exercise)
                  exercise.exerciseCount = exerciseCount
                    exercise.setCount = i + 1
                    unwrapped.push(exercise)
                    exerciseCount++
                })
            }
        })
        return unwrapped
    }
}