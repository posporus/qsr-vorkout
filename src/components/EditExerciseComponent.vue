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
      <preset-select v-model="vPreset" v-slot="{ preset }">
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
      </preset-select>
    </q-item>
  </q-expansion-item>
</template>

<script lang="ts">
import { preset } from 'src/types'
import Exercise from 'src/classes/Exercise'
import PresetSelect from 'components/PresetSelectComponent.vue'
//import ExerciseModel from 'src/store/models/ExerciseModel'
import { ExerciseSelect } from 'src/components/ui'

import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      //exercise: {} as Exercise
      model: 'k972J7TAy8exaIumavBt_',
      //exercise: {},
      vPreset: 'timer',
    }
  },
  components: {
    PresetSelect,
    ExerciseSelect,
  },
  computed: {
    /*
      options():{label:string,id:string}[] {
          return this.myExercises.map((exercise:ExerciseModel) => {
              return { 
                  label:exercise.name,
                  id:exercise.id
                  }
          })
      },
      myExercises() {
      //console.log(WorkoutModel.all())
      //return WorkoutLogModel.all()
      return ExerciseModel.query().withAll().all()
    },
    */
  },
  props: {
    _exercise: Exercise,
  },
  beforeCreate() {
    this.exercise = this._exercise as Exercise
  },
  mounted() {
    // console.log(this.myExercises)
    this.$watch('vPreset', (preset: preset) => {
      this.exercise.preset.name = preset
    })
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
