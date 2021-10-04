import { SettingsModel } from 'src/store/models';
import { value, user_settings, SettingDefault } from 'src/static/userSettings'
/**
 * TODO: better name vor 'value' type
 */
function getSetting (key: string): value {
    const defaultVal: value = user_settings.find(
        (e: SettingDefault) => e.key === key
      )?.default
      
      if (defaultVal !== undefined) {
        const val: value = SettingsModel.find(key)?.value
        console.log(val, defaultVal)
        if (val !== undefined) {
          return val
        } else return defaultVal
      } else {
        return undefined
      }
}

export default getSetting