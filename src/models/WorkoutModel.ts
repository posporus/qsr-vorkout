import { Model } from '@vuex-orm/core'

export default class WorkoutModel extends Model {
    static entity = 'workouts'

    static fields() {
        return {
            id: this.uid(),
            name: this.string(''),
            sets:this.attr([]),
        }
    }
}