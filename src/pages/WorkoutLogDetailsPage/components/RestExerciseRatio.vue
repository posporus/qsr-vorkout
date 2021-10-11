<template>
  <q-item>
      <q-item-section>
          <q-item-label lines="1" class="text-body2">
              Rest:Exercise
          </q-item-label>
      </q-item-section>
      <q-item-section>
          <q-linear-progress :value="workoutLogDetail.restExerciseRatio" size="15px" rounded color="red" track-color="green" class="q-mt-sm" />
      </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WorkoutLogModel } from 'src/store/models'

export default defineComponent({
  name: 'RestExerciseRatio',
  props: {
    workoutLogDetail: {
        type:WorkoutLogModel,
        required:true
    }
  },
  computed: {
      ratio():number {
          //const ratio = 
          return 1
      }
  }
})
</script>
