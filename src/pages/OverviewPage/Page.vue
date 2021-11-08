<template>
  <g-page title="Overview">
    <!-- <q-card>
      <q-btn flat color="dark" icon="settings" @click="$router.push({name:'settings'})" />
    </q-card> -->
    <q-card v-if="lastWorkout">
      <q-card-section>
        Your last Workout ({{ $dayjs(lastWorkout?.started).fromNow() }})
        <workout-log-item :logItem="lastWorkout" />
      </q-card-section>
    </q-card>

    <q-banner v-else rounded class="bg-orange text-white">
      Do your first workout to see something here!

      <template v-slot:action>
        <q-btn label="My workouts" />
      </template>
    </q-banner>

    <q-card>
      <q-card-section>
        Active minutes/day
        <days-activity-overview />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        Activity over time
        <activity-over-time-chart :weeks-to-show="4" />
      </q-card-section>
    </q-card>
  </g-page>
</template>

<script lang="ts">
import ActivityOverTimeChart from 'components/charts/ActivityOverTimeChart.vue'
import DaysActivityOverview from 'src/components/charts/DaysActivityOverview.vue'
import WorkoutLogItem from 'src/components/WorkoutLogItem.vue'
import { WorkoutLogModel } from 'src/store/models'
import { defineComponent } from 'vue'
import { Item } from '@vuex-orm/core'

export default defineComponent({
  components: { ActivityOverTimeChart, DaysActivityOverview, WorkoutLogItem },
  name: 'OverviewPage',
  computed: {
    lastWorkout(): Item<WorkoutLogModel> {
      return WorkoutLogModel.query()
        .orderBy('started', 'desc')
        .withAllRecursive(2)
        .first()
    },
  },
})
</script>

<style lang="scss"></style>
