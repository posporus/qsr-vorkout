import { Model } from '@vuex-orm/core'
//import WorkoutLogModel from './WorkoutLogModel'
import { nanoid } from 'nanoid'
import { SetInterface, WorkoutInterface } from 'src/types'

export default class WorkoutModel extends Model implements WorkoutInterface {
  id!: string
  name!: string
  sets!: Array<SetInterface>
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
