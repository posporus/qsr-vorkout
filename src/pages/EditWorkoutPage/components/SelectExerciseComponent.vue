<template>
  <q-list bordered separator>
    <q-item
      v-for="exercise in exercises"
      :key="exercise.id"
      clickable
      v-ripple
      @click="selectedExercise = exercise.id"
    >
      <q-item-section>
        <q-item-label>
          {{ exercise.name }}
        </q-item-label>
        <q-item-label caption>
          {{ exercise.dateString }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="openEditExercise = true" />
    </q-page-sticky>
    <edit-exercise-dialog v-model="openEditExercise" />
  </q-list>
</template>

<script lang="ts">
import EditExerciseDialog from 'src/components/EditExerciseDialog.vue'
import { ExerciseModel } from 'src/store/models'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { EditExerciseDialog },
  name: 'SelectExerciseComponent',
  data() {
    return {
      selectedExercise: '',
      openEditExercise: false,
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
