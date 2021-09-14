<template>
  <q-page padding>
    <!-- content -->
    <li>
      <ul v-for="workout in workouts" :key="workout.$id">
        {{
          workout.name
        }},
        {{
          workout.$id
        }}
      </ul>
    </li>
    <q-input v-model="name"> </q-input>
    <q-btn @click="newWorkout(name)"> neu </q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WorkoutModel from 'src/store/models/WorkoutModel'
export default defineComponent({
  data() {
    return {
      name: '',
    };
  },
  methods: {
    newWorkout(name: string): void {
      WorkoutModel.insert({
        data: {
          name: name,
        },
      })
        .then(() => {
          this.clearInput();
        })
        .catch((err) => console.error(err));
    },
    clearInput() {
      this.name = '';
    },
  },
  computed: {
    workouts(): Array<WorkoutModel> {
      return WorkoutModel.query().orderBy('name', 'asc').get();
    },
  },
  // name: 'PageName',
});
</script>
