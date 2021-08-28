import Exercise from './Exercise'
export type Status =  'inqueue' | 'next' | 'running' | 'past'
//export class Status = ''
export class ExerciseStatus extends Exercise {
    _status:Status
    _timerActive:boolean
    _repResponse:number | false
    constructor(){
        super()
        this._status='inqueue'
        this._timerActive=false
        this._repResponse= false
    }
    
    public get status():Status {
        return this._status
    }    
    public set status(v:Status) {
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
