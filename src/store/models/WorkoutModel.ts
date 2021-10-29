import { Model } from '@vuex-orm/core'
//import WorkoutLogModel from './WorkoutLogModel'
import { nanoid } from 'nanoid'
import { SetInterface, WorkoutInterface } from 'src/types'
import { WorkoutLogModel } from '.'

export default class WorkoutModel extends Model implements WorkoutInterface {
  id!: string
  name!: string
  sets!: SetInterface[]
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
