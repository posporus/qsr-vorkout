/**
 * This model represents an unique exercise by itself.
 */

import { Model } from '@vuex-orm/core'
import { nanoid } from 'nanoid'
import { exercise_defaults } from 'src/static/defaults'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
dayjs.extend(calendar)

import ExerciseOptions from 'src/types/ExerciseOptions'
import { CategoryExerciseRelationship, CategoryModel } from '.'

export default class ExerciseModel extends Model {
  id!:string
  date!:Date
  name!: string
  countable!:boolean
  defaults!:ExerciseOptions
  categories!:CategoryModel[]
  isFavourite!:boolean

  static entity = 'exercises'
  
  static fields() {
    return {
      id:this.uid(() => nanoid()),
      date:this.attr(Date.now()),
      name:this.string('').nullable(),
      countable:this.boolean(true),
      defaults:this.attr(exercise_defaults),
      categories:this.belongsToMany(CategoryModel,CategoryExerciseRelationship, 'exercise_id','category_id'),
      isFavourite:this.boolean(false)
    };
  }
  
  public get dateString() : string {
    return dayjs(this.date).calendar()
  }
  
}
