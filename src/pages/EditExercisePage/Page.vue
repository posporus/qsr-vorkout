<template>
  <g-page>
    <q-card>
      <q-form>
        <q-input label="Name" v-model="exercise.name" />
      </q-form>
      <q-btn @click="saveExercise" type="submit">save</q-btn>
    </q-card>
  </g-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExerciseModel from 'src/store/models/ExerciseModel'
interface Exercise {
  name: string
}

export default defineComponent({
  name: 'EditExercisePage',
  data() {
    return {
      exercise: {} as Exercise,
    }
  },
  methods: {
    saveExercise() {
      ExerciseModel.insert({
        data: {
          name: this.exercise.name,
        },
      })
        .then(() => {
          void this.$router.push({ path: 'my-exercises' })
        })
        .catch((err) => console.error(err))
    },
  },
})
</script>

<style lang="scss"></style>
