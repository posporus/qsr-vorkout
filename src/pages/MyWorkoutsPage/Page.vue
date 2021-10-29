<template>
  <q-page class="q-pa-md q-gutter-md">
    <q-card>
      <q-list bordered>
        <workout-item v-for="workoutItem in myWorkouts" :workout="workoutItem" :key="workoutItem.$id" separator/>
      </q-list>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        @click="$router.push({ name: 'edit', params: { id: 'new' } })"
        fab
        icon="add"
        color="accent"
      />
    </q-page-sticky>
  </q-page>
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