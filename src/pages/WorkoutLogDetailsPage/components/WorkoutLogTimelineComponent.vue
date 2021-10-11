<template>
  <q-expansion-item
    expand-separator
    icon="timeline"
    label="Timeline"
    caption="John Doe"
  >
    <q-card>
      <q-card-section>
        <q-timeline layout="loose">
          <timeline-entry-component
            v-for="exerciseLog in workoutLogDetail.exercises"
            :key="exerciseLog.$id"
            :exercise-log="exerciseLog"
          />
        </q-timeline>
      </q-card-section>
    </q-card>
    <q-card>
    </q-card>
  </q-expansion-item>
</template>

<script lang="ts">
import { WorkoutLogModel } from 'src/store/models'
import { defineComponent } from 'vue'
import TimelineEntryComponent from './TimelineEntryComponent.vue'

export default defineComponent({
  components: { TimelineEntryComponent },
  name: 'WorkoutLogTimelineComponent',
  props: {
    workoutLogDetail: {
      type: WorkoutLogModel,
      required: true,
    },
  },
})
</script>
