import { Model } from '@vuex-orm/core'

export default class CategoryExerciseRelationship extends Model {
  category_id!: string
  exercise_id!: string



  static entity = 'category_exercise'

  static primaryKey = ['category_id', 'exercise_id']

  static fields () {
    return {
      category_id: this.attr(null),
      exercise_id: this.attr(null),
    };
  }


}
