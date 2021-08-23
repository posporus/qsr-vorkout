<template>
    <q-page padding>
        <q-form>
            <q-card class="q-pa-md">
                <q-card-section class="q-gutter-md">
                    <div class="text-h4">Edit workout</div>
                    <p>{{ workout }}</p>
                </q-card-section>
                <q-card-section class="q-gutter-md">
                    <q-input standout label="Name your workout" v-model="workout.name"></q-input>
                    <edit-set v-for="(set,index) in workout.sets" :workout="workout" :_set="set" :key="index" />
                    <q-btn icon="add" v-on:click="addSet">add set</q-btn>
                </q-card-section>
                <q-card-section>
                    <q-btn @click="exportWorkout">
                        export
                    </q-btn>
                    <q-btn @click="importWorkout">
                        import
                    </q-btn>
                </q-card-section>
            </q-card>
        </q-form>
    </q-page>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Workout from './../classes/Workout'
import EditSet from './../components/edit/EditSet.vue'
export default defineComponent({
    data() {
        return {
            workout: {} as Workout,
            //exportedWorkout:'harry'
        }
    },
    components: {
        EditSet
    },
    beforeMount() {
        //this.newWorkout()
        this.workout = new Workout
        //this.workout = workout
        console.log('created workout!',this.workout)
    },
    mounted() {
        //this.workout = new Workout()
        console.log('mounted!',this.workout)
    },
    computed: {
        
    },
    methods: {
        /*
        newWorkout() {
            const workout = new Workout
            this.workout = workout
        },
        */
        addSet() {
            //console.log('workout',this.workout)
            this.workout.addSet()
        },
        exportWorkout() {
            console.log(JSON.stringify(this.workout.exportWorkout()))
            
        },
        importWorkout() {
            this.workout.importWorkout(JSON.parse('{"id":null,"name":"Mama","sets":[{"hasName":true,"name":"Jey","sets":3,"exercises":[{"name":"Kulla","hasReps":false,"reps":8,"hasTimer":true,"timer":30},{"name":"Mulla","hasReps":true,"reps":8,"hasTimer":false,"timer":30}]},{"hasName":false,"name":"","sets":3,"exercises":[{"name":"Pullaps","hasReps":true,"reps":8,"hasTimer":false,"timer":30},{"name":"Pause","hasReps":false,"reps":8,"hasTimer":true,"timer":30}]}]}'))
        }
        
    }
})
</script>

<style>

</style>