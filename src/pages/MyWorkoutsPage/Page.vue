<template>
  <g-page title="My Workouts">
    <q-card>
      <q-list bordered>
        <workout-item v-for="workoutItem in myWorkouts" :workout="workoutItem" :key="workoutItem.$id" separator/>
        
      </q-list>
    </q-card>
    <div v-if="myWorkouts.length < 1">
          Create a workout!
        </div>
    <g-sticky position="bottom-right" :offset="[68, 18]">
      <q-btn
        @click="$router.push({ name: 'edit', params: { id: 'new' } })"
        fab
        icon="add"
        color="accent"
      />
    </g-sticky>
  </g-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WorkoutModel from 'src/store/models/WorkoutModel'
import WorkoutItem from './components/WorkoutItem.vue'
import { Collection } from '@vuex-orm/core'

export default defineComponent({
  components: { WorkoutItem },
  name:'MyWorkoutsPage',
  computed: {
    myWorkouts():Collection<WorkoutModel> {
      return WorkoutModel.query().withAllRecursive().get()
    },
  },
})
</script>

<style lang="scss">
</style>