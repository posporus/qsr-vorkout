import { Preset, preset } from 'src/types'
import presets from 'src/static/presets'

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