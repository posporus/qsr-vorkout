import { Model } from '@vuex-orm/core'
import { nanoid } from 'nanoid'
/**
 * Category Model
 */
export default class CategoryModel extends Model {
    name!: string
    color!: string

    static entity = 'categories'

    static fields () {
        return {
            id: this.uid(() => nanoid()),
            name: this.string('').nullable(),
            color: this.string('grey-13')
        };
    }

}
