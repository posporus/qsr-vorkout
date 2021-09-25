<template>
  <q-page class="q-pa-md">
    <q-list bordered>
      <q-item-label header> Workout Logg </q-item-label>
      <workout-log-overview-component :workout-log-detail="workoutLogDetail" />
      <workout-log-timeline-component :workout-log-detail="workoutLogDetail" />
    </q-list>

    <q-item>
      <q-item-label>
        {{ workoutLogDetail?.workout.name }}
      </q-item-label>
    </q-item>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WorkoutLogModel } from 'src/store/models'
import { Item } from '@vuex-orm/core'
import WorkoutLogOverviewComponent from './components/WorkoutLogOverviewComponent.vue'
import WorkoutLogTimelineComponent from './components/WorkoutLogTimelineComponent.vue'

export default defineComponent({
  name: 'WorkoutLogDetails',
  props: {
    workoutLogId: {
      type: String,
      //required: true,
      default: 'null',
    },
  },
  components: {
    WorkoutLogOverviewComponent,
    WorkoutLogTimelineComponent,
  },
  computed: {
    workoutLogDetail(): Item<WorkoutLogModel> {
      const workoutLog = WorkoutLogModel.query()
        .whereId(this.workoutLogId)
        .withAllRecursive(1)
        .first()
      return workoutLog
    },
  },
})
</script>
