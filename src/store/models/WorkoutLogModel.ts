import { Model /*,Item*/ } from '@vuex-orm/core'
import { WorkoutModel } from '.'
import { ExerciseLogModel } from '.'
import { nanoid } from 'nanoid'
import moment, {Moment} from 'moment'
import { duration } from 'src/utility'


export default class WorkoutLogModel extends Model {

  workout_id!: string
  workout!: WorkoutModel
  exercises!: ExerciseLogModel[]
  started!: Date
  ended!: Date | false

  _dateString!: string | undefined


  static entity = 'workout_logs'

  static fields () {
    return {
      id: this.uid(() => nanoid()),
      workout_id: this.string(null).nullable(),
      workout: this.belongsTo(WorkoutModel, 'workout_id') || {},
      exercises: this.hasMany(ExerciseLogModel, 'workout_log_id'),
      started: this.attr(Date.now()),
      ended: this.attr(false),
      _dateString: this.attr(undefined),

    };
  }

  public get duration (): string | undefined {
    return duration(this.started, this.ended)
  }

  public get fromNow (): string {
    return moment(this.ended || this.started).fromNow()
  }


  

  public get dateString (): string {

    if (!this._dateString) {
      const date = moment(this.started)
      this._dateString = date.format('YYYY/MM/DD')
    }

    return this._dateString
  }

  public get moment (): Moment {
    return moment(this.started)
  }
  /**
   * get only exercises without rests
   */
  public get onlyExercises(): Array<ExerciseLogModel> {
    return this.exercises.filter(exercise => exercise.exercise !== null)
  }
  /**
   * get only rests without exercises
   */
  public get onlyRests(): Array<ExerciseLogModel> {
    return this.exercises.filter(exercise => exercise.exercise === null)
  }

  public get exerciseCount (): number {
    return this.onlyExercises.length
  }
  public get restCount (): number {
    return this.onlyRests.length
  }
}
