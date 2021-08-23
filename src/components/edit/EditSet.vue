<template>
  <q-card class="q-pa-md">
     <!--{{set}}-->
     <q-card-section class="q-gutter-md">
        <q-toggle label="Has a name" v-model="set.hasName" />
        <q-input v-if="set.hasName" :disable="!set.hasName" standout label="Set Name" v-model="set.name" />
        <q-input standout label="Number of Sets" type="number" v-model.number="set.sets" />
     </q-card-section>
     <q-card-section class="q-gutter-md">
       <edit-exercise v-for="(exercise,index) in set.exercises" :key="index" :_exercise="exercise" />
     </q-card-section>
     <q-card-section>
       <q-btn icon="add" @click="addExercise">add exercise</q-btn>
     </q-card-section>
     
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditExercise from './EditExercise.vue'
import Set from './../../classes/Set'
export default defineComponent({
  data(){
    return {
      //set:{} as Set
    }
  },
  props: {
    _set:Set
  },
  components: {
    EditExercise
  },
  methods: {
    addExercise() {
      this.set.addExercise()
      console.log(this.set)
    }
  },
  setup(props) {
    const set = props._set as Set
    console.log(props._set,set)
    return {
      set
    }
  }
})
</script>

<style>

</style>