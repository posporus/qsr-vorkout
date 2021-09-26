import { Model } from '@vuex-orm/core'
import { SetNeat } from 'src/classes/Set'
//import WorkoutLogModel from './WorkoutLogModel'
import { nanoid } from 'nanoid'
import { WorkoutNeat } from 'src/types'

export default class WorkoutModel extends Model implements WorkoutNeat {
  id!: string
  name!: string
  sets!: Array<SetNeat>
  //logs!: WorkoutLogModel

  static entity = 'workouts'
  
  static fields() {
    return {
      id:this.uid(() => nanoid()),
      name: this.string(''),
      sets: this.attr([]),
      //logs: this.hasMany(WorkoutLogModel,'workout_id')
    };
  }
}
