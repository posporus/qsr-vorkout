<template>
  <q-slide-item
    @right="$router.push({ name: 'edit', params: { id: workout?.$id || '' } })"
    @left="
      $router.push({
        name: 'workout',
        params: { id: workout?.$id || '' },
      })
    "
  >
    <template v-slot:right>
      <q-icon name="edit" />
    </template>
    <template v-slot:left>
      <q-icon name="run_circle" />
    </template>
    <q-item>
      <q-item-section>
        <q-item-label>
          {{ workout?.name }}
        </q-item-label>

        <q-item-label caption>
          {{
            workout?.workout_logs && workout?.workout_logs.length > 0
              ? 'last: ' + $dayjs(workout?.workout_logs[0].started).fromNow()
              : 'never done'
          }}
        </q-item-label>
        <q-item-label caption>
          {{ minutes }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn
          dense
          flat
          @click="removeWorkout(workout?.$id || undefined)"
          icon="delete"
        />
      </q-item-section>
    </q-item>
  </q-slide-item>
  <q-separator v-if="separator" inset />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import WorkoutModel from 'src/store/models/WorkoutModel'
import { Item } from '@vuex-orm/core'
import { Workout } from 'src/classes'
import { toRoundedMinutes } from 'src/utility'

export default defineComponent({
  name: 'WorkoutItem',
  props: {
    workout: {
      type: Object as PropType<Item<WorkoutModel>>,
      required: true,
    },
    separator: {
      type: Boolean,
      default: false,
    },
  },
  beforeMount() {
    console.log('workout_', this.workout?.sets)
    this.workoutClass.importWorkout({
      id: this.workout?.id || '',
      name: this.workout?.name || '',
      sets: this.workout?.sets || [],
    })
  },
  methods: {
    removeWorkout(id = ''): void {
      WorkoutModel.delete(id)
        .then(() => {
          //TODO
          //notification
        })
        .catch((err) => console.error(err))
    },
  },
  computed: {
    minutes():string {
      const d = this.workoutClass.estimatedDuration

      const minutes:number | false = d.duration >= 6e4 ? toRoundedMinutes(d.duration) : false
      console.log(this.workoutClass.name,minutes,d.duration)
      const estSign = d.estimated ? '~':''
      return minutes ? estSign + minutes.toString()+'`' : '<1`'
    }
  },
  setup() {
    const workoutClass = new Workout()
    return {
      workoutClass,
    }
  },
})
</script>

<style lang="scss"></style>
