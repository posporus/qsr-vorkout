export interface Todo {
  id: number
  content: string
}

export interface Meta {
  totalCount: number
}

/**
 * -/-/-/-/-/-/-/
 */
export interface Workout {
  id: number
  name: string// | false
  sets: {
    [index:number]: Set
  }

}

export interface Set {
  name: string | false
  exercises: {
    [index:number]:Exercise
  }
}

export interface Exercise {
  id: number
  name: string | false
  reps: number | false
  timer: number | false //Time in Seconds
}