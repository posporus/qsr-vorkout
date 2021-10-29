<template>
  <q-item clickable v-ripple @click="$router.push({ name: 'workout-log-details', params: { workoutLogId: logItem?.$id || '' } })">

    <q-item-section v-if="time" side>
      <b>
      {{ $dayjs(logItem?.started).format('HH:mm') }}
      </b>
    </q-item-section>


    <q-item-section>
      <q-item-label overline>
        
        {{ logItem?.workout.name }}
     
      </q-item-label>
      <q-item-label caption>
        
        <q-chip dense color="pink-5">
          <q-avatar text-color="white" color="grey-8">
            <q-icon name="done_all" size="xs" /> 
          </q-avatar>
          {{ logItem?.exerciseCount }}x
        </q-chip>

        <q-chip dense color="green-5">
          <q-avatar text-color="white" color="grey-8">
          <q-icon name="hourglass_top" size="xs" />
          </q-avatar>
          {{ logItem?.restCount }}x
        </q-chip>

        <q-chip dense color="cyan-5" v-if="logItem?.duration">
          <q-avatar text-color="white" color="grey-8">
            <q-icon name="timer" size="xs" /> 
          </q-avatar>
          {{  minutes }}
        </q-chip>

      </q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-avatar icon="data_array" color="grey-2" />
    </q-item-section>
    

  </q-item>
  <q-separator v-if="separator" inset />
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
    separator: {
        type: Boolean,
        default: false
    },
    time: {
        type: Boolean,
        default: false
    }
  },
  computed: {
    minutes():string {
      const minutes:number = this.$dayjs.duration(this.logItem?.duration || 0).minutes()
      return (minutes > 1 ? minutes.toString() : '<1')+'′'
    }
  }
})
</script>

<style lang="scss"></style>
