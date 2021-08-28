<template>
    <q-expansion-item
        :header-inset-level="0"
        :content-inset-level="0"
        expand-separator
    >
        <template v-slot:header>
            <q-item-section avatar>
                <q-avatar
                size="sm"
                :icon="exercise.preset.icon"
                :color="exercise.preset.color"
                text-color="white"
                />
            </q-item-section>
            <q-item-section>
                <q-input label="New Exercise" v-model="exercise.name" dense/>
            </q-item-section>
        </template>
        <q-item>
            <preset-select v-model="vPreset" v-slot="{preset}">

                <q-item v-if="preset.timer">
                    <q-item-section>
                        <q-input label="Timer" fill-mask mask="##:##" v-model="exercise.time.timeString" />
                    </q-item-section>
                </q-item>
            
                <q-item v-if="preset.reps">
                    <q-item-section>
                        <q-input label="Reps" v-model="exercise.reps" />
                    </q-item-section>
                </q-item>
                     
            </preset-select>
        </q-item>
               
        
    </q-expansion-item>
  
</template>

<script lang="ts">
import { preset } from '../../classes/PresetController'
import Exercise from './../../classes/Exercise'
import PresetSelect from './PresetSelect.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    data(){
        return {
            //exercise: {} as Exercise
            vPreset:'timer'
        }
    },
    components: {
        PresetSelect
    },
    props: {
        _exercise:Exercise
    },
    beforeCreate() {
        this.exercise = this._exercise as Exercise
    },
    mounted(){
        this.$watch('vPreset',(preset:preset) => {
            this.exercise.preset.name = preset
           
        })
    },
    setup(props) {
        const exercise = props._exercise as Exercise
        return {
            exercise
        }
    }
})
</script>

<style>

</style>