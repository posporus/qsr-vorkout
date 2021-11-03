import { Model } from '@vuex-orm/core'
import { settingValue } from 'src/static/userSettings'


export default class SettingsModel extends Model {
  key!: string
  value!: settingValue

  static primaryKey = 'key'

  static entity = 'settings'
  
  static fields() {
    return {
      key: this.string(''),
      value: this.attr(false),
    };
  }
    
}
