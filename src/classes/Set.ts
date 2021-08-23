import Exercise, { ExerciseNeat } from './Exercise'
export interface SetNeat {
    hasName:boolean
    name:string
    sets:number
    exercises:Array<ExerciseNeat>

}
export default class Set {
    _name:string
    _hasName:boolean
    _sets:number
    _exercises:Array<Exercise>

    constructor() {
        this._name = ''
        this._hasName = false
        this._sets = 3
        this._exercises = []
    }   
    /**
     * getter/setter
     */
    public set name(v:string) {
        this._name = v;
    }
    
    public get name():string {
        return this._name
    }
    
    
    public set hasName(v:boolean) {
        this._hasName = v;
    }
    
    public get hasName():boolean {
        return this._hasName
    }
    
    
    public set sets(v : number) {
        this._sets = v;
    }
    
    public get sets() : number {
        return this._sets
    }
    
    

    public get exercises():Array<Exercise> {
        return this._exercises
    }
    
    /**
     * methods
     */
    addExercise():void {
        const exercise = new Exercise
        this._exercises.push(exercise)
    }
    exportSet():SetNeat {
        const exercises:Array<ExerciseNeat> = []
        this._exercises.forEach((exercise) => {
            exercises.push(exercise.exportExercise())
        })
        return {
            hasName:this.hasName,
            name:this.name,
            sets:this.sets,
            exercises:exercises
        }
    }
    importSet(set:SetNeat) {
        this.hasName = set.hasName,
        this.name = set.name,
        this.sets = set.sets,
        set.exercises.forEach((exercise) => {
            const newExercise = new Exercise
            newExercise.importExercise(exercise)
            this.exercises.push(newExercise)
        })
    }
}