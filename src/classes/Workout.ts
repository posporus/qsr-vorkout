import Set, { SetNeat } from './Set'
import { WorkoutNeat } from 'src/types'
import Exercise from './Exercise'
import _ from 'lodash'

import { ExerciseModel } from 'src/store/models'

export default class Workout {
    id:string
    _name:string
    _sets:Array<Set>

    constructor() {
        this.id = ''
        this._name = ''
        this._sets = []
    }
    /**
     * Getter/Setter
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

    
    public get estimatedDuration() : {duration:number,estimated:boolean} {
        //let duration = 0
        console.log('estimatedDuration,unwrapped',this.unwrapped)
        const estimated = {
            duration:0,
            estimated:false
        }
        this.unwrapped.forEach(exericse => {
            console.log('exercise time', exericse.time.seconds)
            const time:number | false = exericse.time.seconds > 0 ? exericse.time.seconds*1000 : false
            estimated.duration += time || ExerciseModel.find(exericse.id)?.averageRepDuration(3) || 0
            if(!time) estimated.estimated = true
        })
        return estimated
    }
    
    /**
     * Methods
     */
    addSet():void {
        const set = new Set
        this._sets.push(set)
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
        this.id = workout.id || '',
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