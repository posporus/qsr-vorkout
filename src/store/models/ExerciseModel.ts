/**
 * This model represents an unique exercise by itself.
 */

import { Model } from '@vuex-orm/core'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(calendar)

import ExerciseOptions from 'src/types/ExerciseOptions'
import { CategoryExerciseRelationship, CategoryModel } from '.'

import { ExerciseLogModel } from '.'

export default class ExerciseModel extends Model {
  id!: string
  date!: Date
  name!: string
  countable!: boolean
  defaults!: ExerciseOptions
  categories!: CategoryModel[]
  isFavourite!: boolean
  exercise_logs!: ExerciseLogModel[]

  static entity = 'exercises'

  static fields () {
    return {
      id: this.uid(() => nanoid()),
      date: this.attr(Date.now()),
      name: this.string('').nullable(),
      countable: this.boolean(true),
      categories: this.belongsToMany(CategoryModel, CategoryExerciseRelationship, 'exercise_id', 'category_id'),
      isFavourite: this.boolean(false),
      exercise_logs: this.hasMany(ExerciseLogModel, 'exercise_id')
    };
  }

  public get dateString (): string {
    return dayjs(this.date).calendar()
  }

  /**
   * Returns the last exercise logs that had reps.
   * @param nOExercises Number of lxercise logs to return.
   * @returns exercise logs
   */
  public getLastExerciseLogsWithReps (nOExercises: number): ExerciseLogModel[] {
    const exercise_logs: ExerciseLogModel[] = this.exercise_logs.filter(log => !!log.reps)
    const spliceStart = (nOExercises > exercise_logs.length) ? 1 : exercise_logs.length - nOExercises
    console.log('spliceStart', spliceStart,exercise_logs)
    return exercise_logs.splice(spliceStart)
  }
  /**
   * Returns the average duration of an exercise
   * @param nOExercises Number of exercises that shoulb took into account
   * @param defaultDuration Should return this if no exercise was found.
   * @returns average duration in ms
   */
  public averageRepDuration (nOExercises: number, defaultDuration = 2000): number {
    const last_logs = this.getLastExerciseLogsWithReps(nOExercises)
    let duration = 0
    last_logs.forEach(log => {
      duration += (log.repDuration || 0)
      console.log('duration',duration,log.repDuration)
    })
    return duration / last_logs.length || defaultDuration
    
  }

}
