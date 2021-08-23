import Time from './Time'
import Timer from './Timer'

//export type Status =  'inqueue' | 'next' | 'running' | 'past'
export interface ExerciseNeat {
    name:string
    hasReps:boolean
    reps:number
    hasTimer:boolean
    time:number
}
export default class Exercise {
    _id:number
    _name:string

    _hasReps:boolean
    _reps:number

    _hasTimer:boolean
    _timer:Timer | false    //false when no timer instance 
    _time:Time

    constructor() {
        this._id = Math.round(Math.random() * 99999)
        this._name = ''

        this._hasReps = false
        this._reps = 8

        this._hasTimer =  false
        this._timer = false
        this._time = new Time


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
        return this._hasReps
    }
    
    public set hasReps(v:boolean) {
        this._hasReps = v;
    }
    
    
    public get reps():number {
        return this._reps
    }
    public set reps(v:number) {
        this._reps = v;
    }
    
    
    public get hasTimer():boolean {
        return this._hasTimer
    }
    public set hasTimer(v:boolean) {
        this._hasTimer = v;
    }

    
    public get timer():Timer | false {
        return this._timer
    }
    public set timer(v:Timer | false) {
        this._timer = v;
    }

    
    public get time():Time {
        return this._time
    }    
    public set time(v:Time) {
        this._time = v;
    }
    
    
    public get id():number {
        return this._id
    }
    
    
    
    exportExercise():ExerciseNeat {
        return {
            name:this.name,
            hasReps:this.hasReps,
            reps:this.reps,
            hasTimer:this.hasTimer,
            time:this.time.seconds
        }
    }
    importExercise(exercise:ExerciseNeat) {
        this.name = exercise.name,
        this.hasReps = exercise.hasReps,
        this.reps = exercise.reps,
        this.hasTimer = exercise.hasTimer,
        this.time.seconds = exercise.time
    }
    
    
}