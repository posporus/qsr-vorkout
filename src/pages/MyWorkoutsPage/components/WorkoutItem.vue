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
          {{ workout?.workout_logs && workout?.workout_logs.length > 0 ? 'last: '+$dayjs(workout?.workout_logs[0].started).fromNow() : 'never done' }}
        </q-item-label>
      </q-item-section>
      <!-- <q-item-section>
      <q-btn
        dense
        flat
        @click="
          $router.push({ name: 'edit', params: { id: workout?.$id || '' } })
        "
        icon="edit"
      />
    </q-item-section> -->
      <q-item-section side>
        <q-btn
          dense
          flat
          @click="removeWorkout(workout?.$id || undefined)"
          icon="delete"
        />
      </q-item-section>
      <!-- <q-item-section>
      <q-btn
        dense
        @click="
          $router.push({
            name: 'workout',
            params: { id: workout?.$id || '' },
          })
        "
        icon="run_circle"
      />
    </q-item-section> -->
    </q-item>
  </q-slide-item>
  <q-separator v-if="separator" inset />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import WorkoutModel from 'src/store/models/WorkoutModel'
import { Item } from '@vuex-orm/core'

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
  methods: {
    removeWorkout(id = ''): void {
      WorkoutModel.delete(id)
        .then(() => {
          //notification
        })
        .catch((err) => console.error(err))
    },
  },
})
</script>

<style lang="scss"></style>
