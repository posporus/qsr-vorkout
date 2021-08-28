<template>
    <q-layout>
        <q-page-container>
            
            <workout-component :data="workoutData" />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import WorkoutComponent from './../components/WorkoutComponent.vue'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { WorkoutNeat } from '../classes/Workout'
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
        const id:number = parseInt(this.id || '-1')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.workoutData = this.getWorkout(id) as WorkoutNeat
        console.log('workout data:',this.workoutData)
    },
    components: {
        WorkoutComponent
    },
    computed: {
        ...mapGetters('workoutCollection',['getWorkout'])
    },
    
})
</script>

<style>

</style>