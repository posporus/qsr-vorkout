/**
 * This model represents an unique exercise by itself.
 */

import { Model } from '@vuex-orm/core'
import { nanoid } from 'nanoid'
import { exercise_defaults } from 'src/static/defaults'
import moment from 'moment'

import ExerciseOptions from 'src/types/ExerciseOptions'

export default class ExerciseModel extends Model {
  id!:string
  date!:Date
  name!: string
  countable!:boolean
  defaults!:ExerciseOptions
  

  static entity = 'exercises'
  
  static fields() {
    return {
      id:this.uid(() => nanoid()),
      date:this.attr(Date.now()),
      name:this.string('').nullable(),
      countable:this.boolean(true),
      defaults:this.attr(exercise_defaults),
    };
  }
  
  public get dateString() : string {
    return moment(this.date).calendar()
  }
  
}
