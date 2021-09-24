<template>
  <q-page class="q-pa-md">
    <q-list bordered>
      <q-item-label header> Workout Log </q-item-label>

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
    </q-list>

    {{ workoutLogId }}
    {{ workoutLogDetail?.workout.name }}

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

export default defineComponent({
  name: 'WorkoutLogDetails',
  props: {
    workoutLogId: {
      type: String,
      //required: true,
      default: 'null',
    },
  },
  computed: {
    workoutLogDetail(): Item<WorkoutLogModel> {
      const workoutLog = WorkoutLogModel.query()
        .whereId(this.workoutLogId)
        .withAll()
        .first()
      return workoutLog
    },
  },
})
</script>
