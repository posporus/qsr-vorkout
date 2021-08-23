export interface Workout {
    id: number
    name: string// | false
    sets: Array<Set>
    exercisePointer: number
  
  }
  
  export interface Set {
    name: string | false
    sets: number
    exercises: Array<Exercise>
  }
  
  export interface Exercise {
    //id: number
    name: string | false
    reps: number | false
    timer: number | false //Time in Seconds
  }

  export interface updateSetPayload {
    setIndex:number
    name:string
    sets:number
  }