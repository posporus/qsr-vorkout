import Time from './Time'

import PresetController from '../classes/PresetController'
import { preset } from 'src/types'

export interface ExerciseNeat {
    //id:string
    id:string
    name?:string
    preset:preset
    //hasReps:boolean
    reps?:number
    //hasTimer:boolean
    time?:number
}

export default class Exercise {
    _id:string
    _name:string

    //_hasReps:boolean
    _reps:number

    //_hasTimer:boolean
    _time:Time

    _preset: PresetController

    _meta: {
        exerciseCount:number
        setCount:number
    }
    

    constructor() {
        this._id = '[no id]'//Math.round(Math.random() * 99999).toString()
        this._name = ''

        //this._hasReps = false
        this._reps = 8

        //this._hasTimer =  false
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
    /*
    public set hasReps(v:boolean) {
        this._hasReps = v;
    }
    */
    
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
    /*
    public set hasTimer(v:boolean) {
        this._hasTimer = v;
    }
    */
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
            //hasReps:this.hasReps,
            
            reps:this.reps,
            //hasTimer:this.hasTimer,
            time:this.time.seconds
        }
    }
    importExercise(exercise:ExerciseNeat) {
        this.id = exercise.id,
        this.name = exercise.name,
        this.preset.name = exercise.preset,
        //this.hasReps = exercise.hasReps,
        this.reps = exercise.reps || -1,
        //this.hasTimer = exercise.hasTimer,
        this.time.seconds = exercise.time || -1
    }
    
    
}