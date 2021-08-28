
import Time from './Time';
export default class Timer extends Time {
    _countdown:number
    _timerObject:NodeJS.Timeout | null
    constructor() {
        super()
        this._countdown=this._seconds
        this._timerObject=null
    }
    /**
     * getter/setter
     */
    
    public get countdown():number {
        return this._countdown
    }
    
    public set countdown(v:number) {
        this._countdown = v;
    }
    
    //not happy with this
    public set seconds(v:number) {
        this._seconds = v;
        this.countdown = v;
    }
    
    public get seconds():number {
        return this._seconds
    }
    
    

    public get countdownString():string {
        return this.secondsToString(this.countdown)
    }
    
    public get percentage():number {
        const remaining = this.seconds - this.countdown
        const percentage = 100*remaining/this.seconds 
        console.log(remaining,this.seconds,this.countdown,percentage)
        return percentage
    }
    /**
     * methods
     */

    countDown():Promise<this> {
        return new Promise(resolve => {
            this._countdown--
            if(this._countdown<=0) {
                this.stop()
                console.log('time is up!')
                resolve(this)
            }
        })
        
    }

    run():Promise<this> {
        //return 
        return new Promise((resolve) => {
            this._timerObject = setInterval(() => {
                void this.countDown().then(() => {
                    resolve(this)
                })
            },1000)
        })
    }

    stop() {
        return this._timerObject !== null ? clearInterval(this._timerObject) : false
    }
    
}