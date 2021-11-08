<template>
  <g-page hideHeader>
    <q-card>
    <q-list bordered>

      <workout-log-item :log-item="workoutLogDetail"/>
      <q-separator/>
      <rest-exercise-ratio :workout-log-detail="workoutLogDetail"/>
      <q-separator/>
      <workout-log-timeline-component :workout-log-detail="workoutLogDetail" />
    </q-list>
    </q-card>
  </g-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WorkoutLogModel } from 'src/store/models'
import { Item } from '@vuex-orm/core'
//import WorkoutLogOverviewComponent from './components/WorkoutLogOverviewComponent.vue'
import WorkoutLogTimelineComponent from './components/WorkoutLogTimelineComponent.vue'
import RestExerciseRatio from './components/RestExerciseRatio.vue'
import WorkoutLogItem from 'components/WorkoutLogItem.vue'

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
    //WorkoutLogOverviewComponent,
    WorkoutLogTimelineComponent,
    RestExerciseRatio,
    WorkoutLogItem
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
