export type value = boolean | number | undefined
//export type type = 'toggle'
export interface SettingDefault {
    cathegory: string
    key: string
    label: string
    default: value
}
export interface SettingsCathegory {
    name: string
    label: string
}
const user_settings: Array<SettingDefault> = [
    {   
        cathegory: 'workout',
        key: 'workout/skipLastRest',
        label:'Skip last Rest',
        default: true,
    },
    {
        cathegory: 'workout',
        key: 'workout/hideStatusBar',
        label:'Hide status bar',
        default: true,
    },
    {
        cathegory: 'workout',
        key: 'workout/countdownSound',
        label:'Play sound on countdown',
        default: true,
    },
    /*
    {
        cathegory: 'appearance',
        key: 'appearance/master',
        label:'Master',
        default: false,
    },
    */

]
const user_settings_cathegories: Array<SettingsCathegory> = [
    { name: 'workout', label: 'Workout' },
    //{ name: 'appearance', label: 'Appearance' }
]

export { user_settings, user_settings_cathegories }