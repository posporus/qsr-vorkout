<template>
  <q-page class="workout">
      
      <exercise-component
        v-for="(exercise, index) in exercises"
        :exercise="exercises[index]"
        :status="exercises[index].status"
        :timerActive="exercises[index].timerActive && !userBusy"
        @next="!userBusy ? next(index) : false"
        @focusActive="!userBusy ? focusActive() : false"
        @repResponse="(reps) => whenRepResponse(reps,index)"
        :key="exercise.id"
        />
        <!--
        <div class="text-h5">
            Exercise:
            {{ exercisePointer }}
            Active:
            {{ active }}
        </div>
        -->
        <!--
      <q-btn class="forward-button" @click="forward">forward</q-btn>-->
  </q-page>
</template>

<script lang="ts">
import Exercise from '../classes/Exercise'
import Workout from '../classes/Workout'
import { ExerciseStatus } from '../classes/ExerciseStatus'
import ExerciseComponent from './workout/ExerciseComponent.vue'
import { defineComponent } from 'vue'


export default defineComponent({
    data() {
        return {
            active:false,
            exercises:[] as Array<ExerciseStatus>,
            exercisePointer: -1 as number,
        }
    },
    props: [
        'data'
    ],
    components: {
        ExerciseComponent
    },
    
    mounted() {
        const workout = new Workout
        //workout = new WorkoutController
        console.log(this.data)
        workout.importWorkout(this.data)
        

        this.exercises = workout.unwrapped.map((_exercise:Exercise) => {
            let exercise = new ExerciseStatus
            //_exercise = ExerciseStatus()
            //exercise = _exercise as ExerciseStatus
            exercise.importExercise(_exercise.exportExercise())
            return exercise
        })


        this.exercisePointer = 0;
        console.log('current Exercise:',this.currentExercise)
        this.run()
        this.focusActive()
        this.currentExercise.startTimer()
        //console.log('userbusy',this.userBusy)
        
    },

    methods: {
        next(index:number) {
            this.exercisePointer = index + 1
            this.currentExercise.startTimer()                   
        },
        focusActive() {
            this.exercises[this.exercisePointer].status = 'running'
            this.exercisePointer > 0 ? this.exercises[this.exercisePointer-1].status = 'past' : false
            this.exercisePointer > 1 ? this.exercises[this.exercisePointer-2].status = 'past' : false
            this.exercisePointer <= this.exercises.length ? this.exercises[this.exercisePointer+1].status = 'next' : false
        },
        
        whenRepResponse(reps:number,index:number) {
            console.log('whenRepResponse Workout', reps, index)
            console.log(this.exercises[index])
            this.exercises[index].repResponse = reps
        },
        run() {
            this.active = true
        },
        pause() {
            this.active = false
        }
    
        
    },
    computed: {
        userBusy():boolean {

            if(
                this.exercisePointer > 1
                && this.exercises[this.exercisePointer-2].status === 'running'
                && !this.exercises[this.exercisePointer-2].repResponse
            ) {
               
                console.log('user busy')
                return true
                
            }
            else {
                console.log('user not busy')
                return false
            }
             
        },
        /*
        lastExercise():ExerciseStatus {
            return this.exercises[this.exercisePointer-1]
        },*/
        
        currentExercise():ExerciseStatus {
            return this.exercises[this.exercisePointer]
        },
        /*
        nextExercise():ExerciseStatus {
            return this.exercises[this.exercisePointer+1]
        }
        */
    }
})
</script>

<style lang="scss">
    .workout {
        //background-color: rgb(0, 129, 214);
        position: fixed;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .forward-button {
        position: fixed;
        top: 0px;
        left:0px;
    }
</style>