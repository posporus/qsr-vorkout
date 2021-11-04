import { Model } from '@vuex-orm/core'
//import WorkoutLogModel from './WorkoutLogModel'
import { nanoid } from 'nanoid'
import { SetNeat } from 'src/types'
import { WorkoutLogModel } from '.'

export default class WorkoutModel extends Model {
  id!: string
  name!: string
  sets!: SetNeat[]
  workout_logs!: WorkoutLogModel[]
  //logs!: WorkoutLogModel

  static entity = 'workouts'
  
  static fields() {
    return {
      id:this.uid(() => nanoid()),
      name: this.string(''),
      sets: this.attr([]),
      workout_logs:this.hasMany(WorkoutLogModel, 'workout_id'),
      //logs: this.hasMany(WorkoutLogModel,'workout_id')
    };
  }

  /* static lastWorkoutLog() {
    return this.query().whereHas('workout_logs')
  } */
}
