import { Model } from '@vuex-orm/core'
import ExerciseModel from './WorkoutModel'
import WorkoutLogModel from './WorkoutLogModel'
import { nanoid } from 'nanoid'
//import {WorkoutModel} from '.'
//import { SetNeat } from 'src/classes/Set'

export default class ExerciseLogModel extends Model {
  //exercise_id!: string | null
  //exercise!:ExerciseModel | null
  reps?:number | null | false
  setCount!:number 
  exerciseCount!:number
  
  started!: Date
  ended!:Date | false

  workout_log!: WorkoutLogModel | null
  workout_log_id!:string

  exercise!: ExerciseModel | null
  exercise_id!: string

  /*
  constructor() {
    super()
    this.$id = this.uid(nanoid())
  }
  */
  static entity = 'exercise_logs'

  static fields() {
    return {
      id:this.uid(() => nanoid()),
      reps:this.attr(null),
      setCount:this.number(0),
      exerciseCount:this.number(0),

      started: this.attr(Date.now()),
      ended: this.attr(false),

      workout_log: this.belongsTo(WorkoutLogModel,'workout_log_id'),
      workout_log_id:this.string(null).nullable(),
      
      exercise:this.belongsTo(ExerciseModel,'exercise_id'),
      exercise_id:this.string(null).nullable()
    };
  }
}
