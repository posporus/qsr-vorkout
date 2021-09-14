import { Preset, preset } from 'src/types'

export const presets:Array<Preset> = [ 
    {
        name:'timer',
        label:'Timer',
        defaultName:false,
        description:'A simple timer.',
        icon:'alarm',
        color:'pink',
        reps:false,
        timer:true
    },
    {
        name:'rest',
        label:'Rest',
        defaultName:'Rest',
        description:'Take a break.',
        icon:'hourglass_top',
        color:'green',
        reps:false,
        timer:true
    },
    {
        name:'repCount',
        label:'Count Reps',
        defaultName:false,
        description:'Count how many Reps you do.',
        icon:'fitness_center',
        color:'teal',
        reps:true,
        timer:false
    },
    {
        name:'repsInTime',
        label:'Reps in Time',
        defaultName:false,
        description:'Count how many Reps you do in a specific time.',
        icon:'av_timer',
        color:'deep-orange',
        reps:true,
        timer:true
    },
]
export default class PresetController  {
    presets:Array<Preset>
    index:number
    constructor() {
        this.presets=presets
        this.index=0
    }
    getPresetFromName(name:preset):number {
        return this.presets.findIndex((preset:Preset) => {
            return preset.name === name
        })
    }
    
    public set name(v:preset) {
        this.index = this.getPresetFromName(v)
    }
    public get name():preset {
        return this.presets[this.index].name
    }
    
    
    public get defaultName():string | false {
        return this.presets[this.index].defaultName
    }
    
    public get label():string {
        return this.presets[this.index].label
    }
    
    public get description():string {
        return this.presets[this.index].description
    }
    
    public get icon():string {
        return this.presets[this.index].icon
    }
    
    public get color():string {
        return this.presets[this.index].color
    }
    
    public get reps():boolean {
        return this.presets[this.index].reps
    }
    
    public get timer():boolean {
        return this.presets[this.index].timer
    }
    
    
    
}