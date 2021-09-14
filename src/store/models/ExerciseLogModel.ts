import { Model } from '@vuex-orm/core'
import ExerciseModel from './WorkoutModel'
//import WorkoutLogModel from './WorkoutLogModel'
import { nanoid } from 'nanoid'
import WorkoutModel from './WorkoutModel'
//import { SetNeat } from 'src/classes/Set'

export default class ExerciseLogModel extends Model {
  exercise_id!: string | null
  exercise!:ExerciseModel | null
  reps?:number | null
  started!: Date
  ended!:Date | false
  /*
  constructor() {
    super()
    this.$id = this.uid(nanoid())
  }
  */
  static entity = 'workout_logs'

  static fields() {
    return {
      id:this.uid(() => nanoid()),
      workout_id: this.string(null).nullable(),
      workout:this.belongsTo(WorkoutModel,'workout_id') || {},
      started: this.attr(Date.now()),
      ended: this.attr(false)
    };
  }
}
