<template>
  <q-item v-ripple>
    <q-item-section>
      <q-item-label lines="1" class="text-body2">
        {{ workoutLogDetail?.workout.name }}
      </q-item-label>
      <q-item-label caption class="text-weight-bold">
        duration:
        {{ workoutLogDetail?.duration }},
        {{ workoutLogDetail?.exerciseCount }} exercises
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
        type:WorkoutLogModel,
        required:true
    }
  },
})
</script>
