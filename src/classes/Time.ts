export default class Time {
    _seconds:number

    constructor() {
        this._seconds = 30
    }
    
    public get timeString():string {
        return this.secondsToString(this._seconds)
    }
    public set timeString(v:string) {

        this._seconds = this.stringToSeconds(v);
    }

    
    public get seconds() : number {
        return this._seconds
    }
    public set seconds(v : number) {
        this._seconds = v;
    }
    
    

    secondsToString(seconds:number) {
        const m:number = Math.floor(seconds/60)
        const s:number = seconds - m * 60
        const mm:string = m < 10 ? '0'+m.toString() : m.toString()
        const ss:string = s < 10 ? '0'+s.toString() : s.toString()
        const string = mm+':'+ss
        return string
    }
    stringToSeconds(mmss:string)  {
        const timeParts = mmss.split(':')
        const seconds = parseInt(timeParts[0])*60 + parseInt(timeParts[1])
        return seconds
    }
    
}