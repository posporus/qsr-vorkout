import Exercise from './Exercise'
import { ExerciseNeat } from 'src/types'
export interface SetNeat {
    sets: number
    exercises: Array<ExerciseNeat>

}
export default class Set {
    _sets: number
    _exercises: Array<Exercise>

    constructor() {

        this._sets = 3
        this._exercises = []
    }
    /**
     * getter/setter
     */
   
    public set sets (v: number) {
        this._sets = v;
    }

    public get sets (): number {
        return this._sets
    }



    public get exercises (): Array<Exercise> {
        return this._exercises
    }

    /**
     * methods
     */
    addExercise (): void {
        const exercise = new Exercise
        this._exercises.push(exercise)
    }
    exportSet (): SetNeat {
        const exercises: Array<ExerciseNeat> = []
        this._exercises.forEach((exercise) => {
            exercises.push(exercise.exportExercise())
        })
        return {
            sets: this.sets,
            exercises: exercises
        }
    }
    importSet (set: SetNeat) {
       
            this.sets = set.sets,
            set.exercises.forEach((exercise) => {
                const newExercise = new Exercise
                newExercise.importExercise(exercise)
                this.exercises.push(newExercise)
            })
    }
}