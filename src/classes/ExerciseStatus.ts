import Exercise from './Exercise'
import {status} from 'src/types'
//export type Status =  'inqueue' | 'next' | 'running' | 'past'
//export class Status = ''
export default class ExerciseStatus extends Exercise {
    _status:status
    _timerActive:boolean
    _repResponse:number | false
    constructor(){
        super()
        this._status='inqueue'
        this._timerActive=false
        this._repResponse= false
    }
    
    public get status():status {
        return this._status
    }    
    public set status(v:status) {
        this._status = v;
    }  

    
    public get repResponse():number | false {
        return this._repResponse
    }
    
    public set repResponse(v:number | false) {
        //console.log(v)
        this._repResponse = v;
    }
    
    
    public get timerActive():boolean {
        return this._timerActive
    }
    
    
    startTimer() {
        this._timerActive = true
    }
}
