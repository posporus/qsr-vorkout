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
export default defineComponent({
    data() {
        return {
            workoutData:'{"id":null,"name":"heini","sets":[{"hasName":false,"name":"","sets":3,"exercises":[{"name":"Hammelbeine ziehen","hasReps":true,"reps":8,"hasTimer":false,"time":4},{"name":"Pause","hasReps":false,"reps":8,"hasTimer":true,"time":4},{"name":"Turborun","hasReps":true,"reps":8,"hasTimer":true,"time":5},{"name":"Pause","hasReps":false,"reps":8,"hasTimer":true,"time":3}]}]}'
        }
    },
    components: {
        WorkoutComponent
    }
})
</script>

<style>

</style>