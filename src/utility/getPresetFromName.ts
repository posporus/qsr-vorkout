import presets from 'src/static/presets';
import { preset, Preset } from 'src/types';

export default function getPresetFromName(name:preset):Preset | null {
    return presets.find((preset:Preset) => {
        return preset.name === name
    }) || null
}
