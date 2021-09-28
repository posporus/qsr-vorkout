<template>
  <q-list bordered>
    <q-item
      v-for="exercise in exercises"
      :key="exercise.id"
      clickable
      v-ripple
      @click="selectedExercise = exercise.id"
    >
      <q-item-section>
        {{ exercise.name }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { ExerciseModel } from 'src/store/models'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SelectExerciseComponent',
  data() {
    return {
      selectedExercise: '',
    }
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue', 'update:show'],
  mounted() {
    this.$watch('selectedExercise', (selectedExercise: string) => {
      this.$emit('update:modelValue', selectedExercise)
    })
    this.$watch('modelValue', (modelValue: string) => {
      this.selectedExercise = modelValue
    })
  },
  computed: {
    exercises() {
      return ExerciseModel.query().all()
    },
  },
})
</script>

<style lang="scss" scoped></style>
