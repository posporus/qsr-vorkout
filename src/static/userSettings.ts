import { Component } from '@vue/runtime-core'

import ToggleSwitch, { ToggleSwitchValue } from 'components/settingItems/ToggleSwitch'
import /* DropDown, */ { DropDownOption, DropDownValue } from 'components/settingItems/DropDown'

type settingValue = ToggleSwitchValue | DropDownValue | undefined
type settingOption = DropDownOption

interface SettingDefault {
    cathegory: string
    key: string
    label: string
    default: settingValue
    component: Component
    options?: settingOption[]
}

interface SettingsCathegory {
    name: string
    label: string
}

const user_settings: SettingDefault[] = [
    {
        cathegory: 'workout',
        key: 'workout/skipLastRest',
        label: 'Skip last Rest',
        default: true,
        component: ToggleSwitch,
    },
    {
        cathegory: 'workout',
        key: 'workout/hideStatusBar',
        label: 'Hide status bar',
        default: true,
        component: ToggleSwitch,
    },
    {
        cathegory: 'workout',
        key: 'workout/countdownSound',
        label: 'Play sound on countdown',
        default: true,
        component: ToggleSwitch,
    },
    /* {
        cathegory: 'workout',
        key: 'workout/soundTheme',
        label: 'Sound Theme',
        default: 'soundTheme1',
        component: DropDown,
        options: [
            {
                label: 'cooler Sound',
                value: 'soundTheme1'
            },
            {
                label: 'krasser Sound',
                value: 'soundTheme2'
            }
        ]
    }, */
    
]
const user_settings_cathegories: Array<SettingsCathegory> = [
    { name: 'workout', label: 'Workout' },
    //{ name: 'appearance', label: 'Appearance' }
]

export {
    user_settings,
    user_settings_cathegories,
    settingValue,
    SettingDefault,
    SettingsCathegory,

}