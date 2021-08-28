import Time from './Time'

import PresetController, {preset} from '../classes/PresetController'

export interface ExerciseNeat {
    name:string
    preset:preset
    //hasReps:boolean
    reps?:number
    //hasTimer:boolean
    time?:number
}

export default class Exercise {
    _id:number
    _name:string

    //_hasReps:boolean
    _reps:number

    //_hasTimer:boolean
    _time:Time

    _preset: PresetController
    

    constructor() {
        this._id = Math.round(Math.random() * 99999)
        this._name = ''

        //this._hasReps = false
        this._reps = 8

        //this._hasTimer =  false
        this._time = new Time

        this._preset = new PresetController


    }
    /**
     * getter/setter
     */
    

    public get name():string {
        return this._name
    }
    
    public set name(v:string) {
        this._name = v;
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
    
    
    public get id():number {
        return this._id
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
            name:this.name,
            preset:this.preset.name,
            //hasReps:this.hasReps,
            
            reps:this.reps,
            //hasTimer:this.hasTimer,
            time:this.time.seconds
        }
    }
    importExercise(exercise:ExerciseNeat) {
        this.name = exercise.name,
        this.preset.name = exercise.preset,
        //this.hasReps = exercise.hasReps,
        this.reps = exercise.reps || -1,
        //this.hasTimer = exercise.hasTimer,
        this.time.seconds = exercise.time || -1
    }
    
    
}