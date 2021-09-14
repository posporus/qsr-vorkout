export type preset = 'timer' | 'rest' | 'repCount' | 'repsInTime'
export default interface Preset {
    name:preset
    defaultName:string | false
    label:string
    description:string
    icon:string
    color:string
    reps:boolean
    timer:boolean
}