<template>
  <q-item>
    <q-item-section>
      <q-item-label>
        {{ exercise.name }}
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-btn @click="removeExercise(exercise.$id)" icon="delete" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExerciseModel from 'src/store/models/ExerciseModel';

export default defineComponent({
  name:'ExerciseItemComponent',
  props: {
      exercise: {
          type: ExerciseModel,
          required: true,
      }
  },
  methods: {
    removeExercise(id: string | null): void {
      ExerciseModel.delete(id || '')
        .then(() => {
          //notification
        })
        .catch((err) => console.error(err))
    },
  },
});
</script>

<style lang="scss"></style>
