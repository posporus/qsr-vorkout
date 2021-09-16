<template>
  <q-page class="workout">
    <exercise-component
      v-for="(exercise, index) in exercises"
      :exercise="exercises[index]"
      :status="exercises[index].status"
      :timerActive="exercises[index].timerActive && !userBusy"
      @next="!userBusy ? next(index) : false"
      @focusActive="!userBusy ? focusActive() : false"
      @repResponse="(reps) => whenRepResponse(reps, index)"
      :key="exercise.id"
      :workout-log-id="logId"
    />
    finished: {{ finished }}
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
import Exercise from 'src/classes/Exercise'
import Workout, { WorkoutNeat } from 'src/classes/Workout'
import { ExerciseStatus } from 'src/classes'
import ExerciseComponent from 'components/DisplayExerciseComponent.vue'
import { defineComponent } from 'vue'
import { Collections } from '@vuex-orm/core'
import WorkoutLogModel from 'src/store/models/WorkoutLogModel'
//import { nanoid } from 'nanoid';

export default defineComponent({
  data() {
    return {
      active: false,
      exercises: [] as Array<ExerciseStatus>,
      exercisePointer: -1 as number,
      //log: {} as Item<WorkoutLogModel>
      logId: 'null' as string | null,

      //workout: new Workout()
    }
  },
  //props: ['data'],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    ExerciseComponent,
  },

  mounted() {
    //const workout = new Workout()
    //workout = new WorkoutController
    //console.log('DADA', this.data)
    const data = this.data as WorkoutNeat
    this.workout.importWorkout(data)

    this.startWorkoutLog()
    this.$watch('finished', (finished: boolean) => {
      //console.log('finished!')
      if (finished) this.endWorkoutLog()
    })
    console.log('unwrappet exercises',this.workout.unwrapped)
    this.exercises = this.workout.unwrapped.map((_exercise: Exercise) => {
      let exercise = new ExerciseStatus()
      //_exercise = ExerciseStatus()
      //exercise = _exercise as ExerciseStatus
      //exercise.importExercise(_exercise.exportExercise())
      //exercise = _exercise as ExerciseStatus
      //Object.assign(exercise,_exercise)
      console.log('exercise meta: ',_exercise._meta)
      exercise._id=_exercise._id,
      exercise._name=_exercise._name,
      exercise._reps=_exercise._reps,
      exercise._time=_exercise._time,
      exercise._preset=_exercise._preset,
      exercise._meta=_exercise._meta

      return exercise
    })

    this.exercisePointer = 0
    console.log('current Exercise:', this.currentExercise)
    this.run()
    this.focusActive()
    this.currentExercise.startTimer()
    //console.log('userbusy',this.userBusy)
  },

  methods: {
    next(index: number) {
      this.exercisePointer = index + 1
      this.currentExercise.startTimer()
    },
    focusActive() {
      this.exercises[this.exercisePointer].status = 'running'
      this.exercisePointer > 0
        ? (this.exercises[this.exercisePointer - 1].status = 'past')
        : false
      this.exercisePointer > 1
        ? (this.exercises[this.exercisePointer - 2].status = 'past')
        : false
      this.exercisePointer <= this.exercises.length
        ? (this.exercises[this.exercisePointer + 1].status = 'next')
        : false
    },

    whenRepResponse(reps: number, index: number) {
      console.log('whenRepResponse Workout', reps, index)
      console.log(this.exercises[index])
      this.exercises[index].repResponse = reps
    },
    run() {
      this.active = true
    },
    pause() {
      this.active = false
    },
    startWorkoutLog() {
      WorkoutLogModel.insert({
        data: {
          //id: nanoid(),
          workout_id: this.data.id as string,

          started: Date.now(),
        },
      })
        .then((collections: Collections) => {
          this.logId = collections.workout_logs[0].$id
          console.log('id try:', collections.workout_logs[0].$id)
          //this.log = log.workout_log
          //console.log('log started.', log);
        })
        .catch((err) => console.log(err))
    },
    endWorkoutLog() {
      this.logId
        ? WorkoutLogModel.update({
            where: this.logId,
            data: {
              ended: Date.now(),
            },
          })
            .then((log) => {
              console.log('log started.', log)
              if (this.finished) {
                //log.end()
              }
            })
            .catch((err) => console.log(err))
        : false
    },
  },
  computed: {
    userBusy(): boolean {
      if (
        this.exercisePointer > 1 &&
        this.exercises[this.exercisePointer - 2].status === 'running' &&
        !this.exercises[this.exercisePointer - 2].repResponse
      ) {
        console.log('user busy')
        return true
      } else {
        console.log('user not busy')
        return false
      }
    },
    /*
        lastExercise():ExerciseStatus {
            return this.exercises[this.exercisePointer-1]
        },*/

    currentExercise(): ExerciseStatus {
      return this.exercises[this.exercisePointer]
    },

    finished(): boolean {
      return this.exercisePointer >= this.exercises.length
    },

    /*
        nextExercise():ExerciseStatus {
            return this.exercises[this.exercisePointer+1]
        }
        */
  },
  setup() {
    const workout = new Workout()
    return {
      workout
    }
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
  left: 0px;
}
</style>
