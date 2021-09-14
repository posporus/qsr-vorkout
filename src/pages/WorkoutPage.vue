<template>
    <q-layout>
        <q-page-container>            
            <workout-component :data="workoutData" />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import WorkoutComponent from '../components/DisplayWorkoutComponent.vue'
import { defineComponent } from 'vue'
//import { mapGetters } from 'vuex'
import { WorkoutNeat } from '../classes/Workout'
import WorkoutModel from 'src/store/models/WorkoutModel'
export default defineComponent({
    data() {
        return {
            workoutData:{} as WorkoutNeat
        }
    },
    props: {
        id:String
    },
    beforeMount() {
        console.log(this.id)
        //const id:number = parseInt(this.id || '-1')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        //this.workoutData = this.getWorkout(id) as WorkoutNeat
        const workout = WorkoutModel.find(this.id || '')
        //const workout = WorkoutModel.query().where('$id', this.id).first()
        console.log('workout:', workout)
        if(workout) {
            this.workoutData = {
            id:workout.$id || '',
            name:workout?.name || '',
            sets:workout?.sets || '',
            }
        }
        
        console.log('workout data:',this.workoutData)
    },
    components: {
        WorkoutComponent
    },
    computed: {
        //...mapGetters('workoutCollection',['getWorkout']),
        

    },
    
})
</script>

<style>

</style>