import { Model } from '@vuex-orm/core'
import {WorkoutModel} from '.'
import { ExerciseLogModel } from '.'
import { nanoid } from 'nanoid'
//import WorkoutModel from './WorkoutModel'
//import { SetNeat } from 'src/classes/Set'

export default class WorkoutLogModel extends Model {
  //$id!: string | null
  workout_id!: string | null
  workout!:WorkoutModel | null
  exercises!:ExerciseLogModel | null
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
      exercises:this.hasMany(ExerciseLogModel,'workout_log_id'),
      started: this.attr(Date.now()),
      ended: this.attr(false)
    };
  }
}
