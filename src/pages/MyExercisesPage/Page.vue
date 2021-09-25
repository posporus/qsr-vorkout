<template>
  <q-page>
    <div class="text-h4">My Exercises</div>
    <q-card>
      <q-list bordered>
        <exercise-item-component v-for="(exercise) in myExercises" :key="exercise.$id" :exercise="exercise" />
      </q-list>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        @click="$router.push({ name: 'edit-exercise' })"
        fab
        icon="add"
        color="accent"
      />
    </q-page-sticky>

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExerciseModel from 'src/store/models/ExerciseModel'
import ExerciseItemComponent from './components/ExerciseItemComponent.vue'

export default defineComponent({
  name:'MyExercisesPage',
  computed: {
    myExercises() {
      return ExerciseModel.query().withAll().all()
    },
  },
  components: {
    ExerciseItemComponent
  }
})
</script>

<style lang="scss">
</style>