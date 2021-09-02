import { Model } from '@vuex-orm/core'
import { SetNeat } from 'src/classes/Set'

export default class WorkoutModel extends Model {
  name!: string
  sets!: Array<SetNeat>

  static entity = 'workouts'

  static fields() {
    return {
      name: this.string(''),
      sets: this.attr([]),
    };
  }
}
