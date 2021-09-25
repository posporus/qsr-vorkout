import { Preset } from 'src/types'
const presets:Array<Preset> = [ 
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
export default presets