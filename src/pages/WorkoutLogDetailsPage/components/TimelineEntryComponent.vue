<template>
  <q-timeline-entry
  :title="exerciseLog.exercise?.name"
  :subtitle="exerciseLog.duration"
  >
      
  </q-timeline-entry>
</template>

<script lang="ts">
import { ExerciseLogModel } from 'src/store/models'
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'WorkoutLogTimelineComponent',
  props: {
    exerciseLog: {
      type:ExerciseLogModel,
      required:true
    }
  },
})
</script>
