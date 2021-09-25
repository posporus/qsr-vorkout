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
        <exercise-select v-model="model" />
        {{ model }}
      </q-item-section>
      <!--
      <q-item-section>
          <q-select v-model="model" :options="options" label="Standard" />
      </q-item-section>

      <q-item-section>
          {{ model }}
        <q-input label="New Exercise" v-model="model" dense />
      </q-item-section>
-->
    </template>
    <q-item>
      <preset-select-component v-model="vPreset" v-slot="{ preset }">
        <q-item v-if="preset.timer">
          <q-item-section>
            <q-input
              label="Timer"
              fill-mask
              mask="##:##"
              v-model="exercise.time.timeString"
            />
          </q-item-section>
        </q-item>

        <q-item v-if="preset.reps">
          <q-item-section>
            <q-input label="Reps" v-model="exercise.reps" />
          </q-item-section>
        </q-item>
      </preset-select-component>
    </q-item>
  </q-expansion-item>
</template>

<script lang="ts">
import { preset } from 'src/types'
import Exercise from 'src/classes/Exercise'
import PresetSelectComponent from './PresetSelectComponent.vue'
//import ExerciseModel from 'src/store/models/ExerciseModel'
import ExerciseSelect from 'src/components/ExerciseSelect.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  name:'EditExerciseComponent',
  data() {
    return {
      //exercise: {} as Exercise
      model: 'k972J7TAy8exaIumavBt_',
      //exercise: {},
      vPreset: 'timer',
    }
  },
  components: {
    PresetSelectComponent,
    ExerciseSelect,
  },
  props: {
    _exercise: Exercise,
  },
  beforeCreate() {
    this.exercise = this._exercise as Exercise
  },
  mounted() {
    this.$watch('vPreset', (preset: preset) => {
      this.exercise.preset.name = preset
    })
    this.$watch('model', ((id:string) => {
      this.exercise.id = id
    }))
  },
  setup(props) {
    const exercise = props._exercise as Exercise
    return {
      exercise,
    }
  },
})
</script>

<style></style>
