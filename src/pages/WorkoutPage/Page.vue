<template>
  <q-layout>
    <q-page-container>
      <display-workout-component :data="workoutData" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import DisplayWorkoutComponent from './components/DisplayWorkoutComponent.vue'
import { defineComponent } from 'vue'
import { WorkoutNeat } from 'src/classes/Workout'
import WorkoutModel from 'src/store/models/WorkoutModel'
export default defineComponent({
  name: 'WorkoutPage',
  data() {
    return {
      workoutData: {} as WorkoutNeat,
    }
  },
  props: {
    id: String,
  },
  beforeMount() {
    console.log(this.id)

    const workout = WorkoutModel.find(this.id || '')

    console.log('workout:', workout)
    if (workout) {
      this.workoutData = {
        id: workout.$id || '',
        name: workout?.name || '',
        sets: workout?.sets || '',
      }
    }
  },
  components: {
    DisplayWorkoutComponent,
  },
})
</script>
