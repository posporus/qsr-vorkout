<template>
  <q-card class="q-pa-md">
      <q-card-section class="q-gutter-md">
          <q-input label="Exercise Name" v-model="exercise.name" />
          <q-toggle label="Reps" v-model="exercise.hasReps" />
          <q-input v-if="exercise.hasReps" label="Reps" v-model="exercise.reps" />
          <q-toggle label="Timer" v-model="exercise.hasTimer" />
          <q-input v-if="exercise.hasTimer" type="time" label="Timer" v-model="exercise.time.timeString" />
          <p>{{exercise.time.seconds}}</p>
      </q-card-section>
      <q-card-section>
          
      </q-card-section>
     <!--{{exercise}}-->
     
  </q-card>
</template>

<script lang="ts">
import Exercise from './../../classes/Exercise'
import { defineComponent } from 'vue'
export default defineComponent({
    data(){
        return {
            //exercise: {} as Exercise
        }
    },
    props: {
        _exercise:Exercise
    },
    beforeCreate() {
        this.exercise = this._exercise as Exercise
    },
    setup(props) {
        const exercise = props._exercise as Exercise
        //console.log(props._set,set)
        return {
            exercise
        }
    }
})
</script>

<style>

</style>