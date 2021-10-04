import { Model } from '@vuex-orm/core'


export type key=string
export type value= boolean | number | undefined

export const settings_defaults:{[key:string]:value} = {
  'workout/skipLastRest':true,
}
export default class SettingsModel extends Model {
  key!: key
  value!: value

  static primaryKey = 'key'

  static entity = 'settings'
  
  static fields() {
    return {
      key: this.string(''),
      value: this.attr(false),
    };
  }
    
}
