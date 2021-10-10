import { Model } from '@vuex-orm/core'
import ExerciseModel from './ExerciseModel'
import WorkoutLogModel from './WorkoutLogModel'
import { nanoid } from 'nanoid'
import { duration } from 'src/utility'
import moment, { Moment } from 'moment'
//import {WorkoutModel} from '.'
//import { SetNeat } from 'src/classes/Set'

export default class ExerciseLogModel extends Model {
  //exercise_id!: string | null
  //exercise!:ExerciseModel | null
  reps?: number | null | false
  setCount!: number
  exerciseCount!: number

  started!: Date
  ended!: Date | false

  workout_log!: WorkoutLogModel | null
  workout_log_id!: string

  exercise!: ExerciseModel | null
  exercise_id!: string

  _duration!: string | undefined
  _dateString!: string | undefined

  static entity = 'exercise_logs'

  static fields () {
    return {
      id: this.uid(() => nanoid()),
      reps: this.attr(null),
      setCount: this.number(0),
      exerciseCount: this.number(0),

      started: this.attr(Date.now()),
      ended: this.attr(false),

      workout_log: this.belongsTo(WorkoutLogModel, 'workout_log_id'),
      workout_log_id: this.string(null).nullable(),

      exercise: this.belongsTo(ExerciseModel, 'exercise_id'),
      exercise_id: this.string(null).nullable(),
      /**
       * caching
       */
      _duration: this.attr(undefined),
      _dateString: this.attr(undefined),
    };
  }

  public get duration (): string | undefined {
    if (this.ended) {
      if (!this._duration) {
        this._duration = duration(this.started, this.ended)
      }
      return this._duration
    }

    return duration(this.started, this.ended)
  }

/*
  public get dateString (): string {

    if (!this._dateString) {
      const date = moment(this.started)
      this._dateString = date.format('YYYY/MM/DD')
    }

    return this._dateString
  }
*/

  public get moment (): Moment {
    return moment(this.started)
  }

}
