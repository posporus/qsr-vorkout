import { SettingsModel } from 'src/store/models';
import { user_settings } from 'src/static/userSettings'
import type { settingValue,SettingDefault } from 'src/static/userSettings'
/**
 * TODO: better name vor 'value' type
 */
function getSetting (key: string): settingValue {
    const defaultVal: settingValue = user_settings.find(
        (e: SettingDefault) => e.key === key
      )?.default
      
      if (defaultVal !== undefined) {
        const val: settingValue = SettingsModel.find(key)?.value
        console.log(val, defaultVal)
        if (val !== undefined) {
          return val
        } else return defaultVal
      } else {
        return undefined
      }
}

export default getSetting