<template>
  <q-item clickable v-ripple @click="$router.push({ name: 'workout-log-details', params: { workoutLogId: logItem?.$id || '' } })">

    <q-item-section side>
      <b>
      {{ logItem?.moment.format('HH:mm') }}
      </b>
    </q-item-section>


    <q-item-section>
      <q-item-label>
        <div class="text-bold">
        {{ logItem?.workout.name }}
        </div>
      </q-item-label>
      <q-item-label caption>
        
        <q-chip dense color="white">
          <q-avatar color="grey-2">
            <q-icon name="done_all" size="sm" /> 
          </q-avatar>
          {{ logItem?.exerciseCount }}
        </q-chip>

        <q-chip dense color="white">
          <q-avatar color="green-2">
          <q-icon name="hourglass_top" size="sm" />
          </q-avatar>
          {{ logItem?.restCount }}
        </q-chip>

        <q-chip dense color="white" v-if="logItem?.duration">
          <q-avatar color="grey-2">
            <q-icon name="timer" size="sm" /> 
          </q-avatar>
          {{ logItem?.duration }}
        </q-chip>

      </q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-avatar icon="data_array" color="grey-2" />
    </q-item-section>
    

  </q-item>
  <q-separator inset />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { WorkoutLogModel } from 'src/store/models'
import { Item } from '@vuex-orm/core'
//import moment from 'moment'

//type LogItem = Item<ExerciseLogModel>

export default defineComponent({
  name: 'ExerciseLogItem',
  props: {
    logItem: {
      type: Object as PropType<Item<WorkoutLogModel>>,
      required: true,
    },
  },
})
</script>

<style lang="scss"></style>
