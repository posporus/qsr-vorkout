<template>
  <q-select v-model="model" :options="options" label="Standard" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ExerciseModel from 'src/store/models/ExerciseModel'

import { SelectInterface } from 'src/types'
import { exercise_select_defaults } from 'src/static/defaults'

export default defineComponent({
  name: 'ExerciseSelect',
  data() {
    return {
      model: exercise_select_defaults,
    }
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  mounted() {
    this.model = this.selected

    this.$watch('model', (selected: { label: string; value: string }) => {
      this.$emit('update:modelValue', selected.value)
    })

    this.$watch('modelValue', () => {
      this.model = this.selected
    })
  },
  computed: {
    myExercises() {
      return ExerciseModel.query().withAll().all()
    },
    options(): { label: string; value: string }[] {
      return this.myExercises.map((exercise: ExerciseModel) => {
        return {
          label: exercise.name,
          value: exercise.id,
        }
      })
    },
    selected(): SelectInterface {
      const exercise = ExerciseModel.find(this.modelValue)
      return {
        label: exercise ? exercise.name : exercise_select_defaults.label,
        value: exercise ? exercise.id : exercise_select_defaults.value,
      }
    },
  },
})
</script>

<style></style>
