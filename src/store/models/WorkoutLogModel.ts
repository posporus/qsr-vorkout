import { Model /*,Item*/ } from '@vuex-orm/core'
import { WorkoutModel } from '.'
import { ExerciseLogModel } from '.'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)

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

  public get duration (): number | null {
    return this.ended ? +this.ended - +this.started : 0
  }

  public get fromNow (): string {
    return dayjs(this.ended || this.started).fromNow()
  }




  public get dateString (): string {

    if (!this._dateString) {
      this._dateString = dayjs(this.started).format('YYYY/MM/DD')
    }

    return this._dateString
  }

  /**
   * get only exercises without rests
   */
  public get onlyExercises (): Array<ExerciseLogModel> {
    return this.exercises.filter(exercise => exercise.exercise !== null)
  }
  /**
   * get only rests without exercises
   */
  public get onlyRests (): Array<ExerciseLogModel> {
    return this.exercises.filter(exercise => exercise.exercise === null)
  }

  public get exerciseCount (): number {
    return this.onlyExercises.length
  }
  public get restCount (): number {
    return this.onlyRests.length
  }

  get exerciseTotal (): number {
    let total = 0
    this.onlyExercises.forEach((exercise: ExerciseLogModel) => {
      if (exercise.duration !== null) {
        total+= exercise.duration
      }
    })
    
    return total || 0
  }

  get restTotal (): number {
    let total = 0
    this.onlyRests.forEach((exercise: ExerciseLogModel) => {
      if (exercise.duration !== null) {
        total+= exercise.duration
      }
    })
   
    return total || 0
  }

  
  public get restExerciseRatio() : number {
    return this.exerciseTotal / (this.exerciseTotal + this.restTotal)
  }
  
}
