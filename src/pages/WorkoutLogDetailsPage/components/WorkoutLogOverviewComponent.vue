<template>
  <q-item v-ripple>
    <q-item-section>
      <q-item-label lines="1" class="text-body2">
        {{ workoutLogDetail?.workout.name }}
      </q-item-label>
      <q-item-label caption class="text-weight-bold">
        
        <q-chip dense color="white">
          <q-avatar color="grey-2">
            <q-icon name="done_all" size="sm" /> 
          </q-avatar>
          {{ workoutLogDetail?.exerciseCount }}
        </q-chip>

        <q-chip dense color="white">
          <q-avatar color="green-2">
          <q-icon name="hourglass_top" size="sm" />
          </q-avatar>
          {{ workoutLogDetail?.restCount }}
        </q-chip>

        <q-chip dense color="white" v-if="workoutLogDetail?.duration">
          <q-avatar color="grey-2">
            <q-icon name="timer" size="sm" /> 
          </q-avatar>
          {{ $dayjs.duration(workoutLogDetail?.duration || 0).format('MM:ss') }}
        </q-chip>
        
      </q-item-label>
    </q-item-section>
    <q-item-section top side>
      <q-item-label>
        {{ workoutLogDetail?.fromNow }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WorkoutLogModel } from 'src/store/models'

export default defineComponent({
  name: 'WorkoutLogOverviewComponent',
  props: {
    workoutLogDetail: {
      type: WorkoutLogModel,
      required: true,
    },
  },
})
</script>
