<template>
  <q-page class="q-gutter-xs">
    <div class="text-h4">My Workouts</div>
    <q-card>
      <q-list bordered>
        <q-item v-for="(workout) in myWorkouts" :key="workout.$id">
          <q-item-section>
            <q-item-label>
              {{ workout.name }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-btn
              @click="$router.push({ name: 'edit', params: { id: workout.$id || '' } })"
              icon="edit"
            />
          </q-item-section>
          <q-item-section>
            <q-btn @click="removeWorkout(workout.$id)" icon="delete" />
          </q-item-section>
          <q-item-section>
            <q-btn
              @click="$router.push({ name: 'workout', params: { id: workout.$id || '' } })"
              icon="run_circle"
            />
          </q-item-section>
        </q-item>
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

export default defineComponent({
  name:'MyWorkoutsPage',
  computed: {
    myWorkouts() {
      console.log(WorkoutModel.all())
      return WorkoutModel.all()
    },
  },
  methods: {
    removeWorkout(id:string | null): void {
      WorkoutModel.delete(id || '').then(() => {
        console.log('deleted');
      }).catch((err) => console.error(err))
    },
  },
})
</script>

<style lang="scss">
</style>