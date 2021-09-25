import Time from './Time'
import { ExerciseNeat } from 'src/types'
import PresetController from '../classes/PresetController'

export default class Exercise {
    _id:string
    _name:string

    _reps:number

    _time:Time

    _preset: PresetController

    _meta: {
        exerciseCount:number
        setCount:number
    }
    

    constructor() {
        this._id = '[no id]'//placeholder
        this._name = ''

        this._reps = 8

        this._time = new Time

        this._preset = new PresetController
        this._meta = {
            exerciseCount:0,
            setCount:0,
        }


    }
    /**
     * getter/setter
     */
    
    public get exerciseCount():number {
        return this._meta.exerciseCount
    }
    public set exerciseCount(v:number) {
        this._meta.exerciseCount = v;
    }

    
    public get setCount():number {
        return this._meta.setCount
    }
    public set setCount(v:number) {
        this._meta.setCount = v;
    }

    
    public get id():string {
        return this._id
    }    
    public set id(v:string) {
        console.log('Exercise ID set!',v)
        this._id = v;
    }
    

    public get name():string | undefined {
        return this._name
    }
    public set name(v:string | undefined) {
        this._name = v || '';
    }
    
    
    public get hasReps():boolean {
        return this.preset.reps
    }
    
    
    public get reps():number | undefined {
        if(this.hasReps) return this._reps
        else return undefined
    }
    public set reps(v:number | undefined) {
        this._reps = v || -1
        
    }
    
    
    public get hasTimer():boolean {
        return this.preset.timer
    }
    
    public get time():Time {
        return this._time
    }    
    public set time(v:Time) {
        this._time = v;
    }
    
    public get preset():PresetController {
        return this._preset
    }    
    public set preset(v:PresetController) {
        this._preset = v;
    }
    
    
    public get color():string {
        return this.preset.color
    }
    
    
    /**
     * Methods
     */
    
    exportExercise():ExerciseNeat {
        return {
            id:this.id,
            name:this.name,
            preset:this.preset.name,
            
            reps:this.reps,
            time:this.time.seconds
        }
    }
    importExercise(exercise:ExerciseNeat) {
        this.id = exercise.id,
        this.name = exercise.name,
        this.preset.name = exercise.preset,
        this.reps = exercise.reps || -1,
        this.time.seconds = exercise.time || -1
    }
    
    
}