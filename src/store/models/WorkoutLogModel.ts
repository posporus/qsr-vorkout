import { Model } from '@vuex-orm/core'
import { WorkoutModel } from '.'
import { ExerciseLogModel } from '.'
import { nanoid } from 'nanoid'
import moment from 'moment'
import { duration } from 'src/utility'


export default class WorkoutLogModel extends Model {

  workout_id!: string
  workout!: WorkoutModel
  exercises!: ExerciseLogModel[]
  started!: Date
  ended!: Date | false

  static entity = 'workout_logs'

  static fields () {
    return {
      id: this.uid(() => nanoid()),
      workout_id: this.string(null).nullable(),
      workout: this.belongsTo(WorkoutModel, 'workout_id') || {},
      exercises: this.hasMany(ExerciseLogModel, 'workout_log_id'),
      started: this.attr(Date.now()),
      ended: this.attr(false)
    };
  }

  public get duration (): string | undefined {
    return duration(this.started, this.ended)
  }

  public get fromNow (): string {
    return moment(this.ended || this.started).fromNow()
  }


  public get exerciseCount (): number {
    return this.exercises.length
  }


}
