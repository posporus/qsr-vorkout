<template>
  <q-page class="workout">
    <display-exercise-component
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
  </q-page>
</template>

<script lang="ts">
import Exercise from 'src/classes/Exercise'
import Workout from 'src/classes/Workout'
import { WorkoutNeat } from 'src/types'
import { ExerciseStatus } from 'src/classes'
import DisplayExerciseComponent from './DisplayExerciseComponent.vue'
import { defineComponent } from 'vue'
import { Collections } from '@vuex-orm/core'
import WorkoutLogModel from 'src/store/models/WorkoutLogModel'

export default defineComponent({
  name: 'DisplayWorkoutComponent',
  data() {
    return {
      active: false,
      exercises: [] as Array<ExerciseStatus>,
      exercisePointer: -1 as number,
      logId: 'null' as string | null,
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    DisplayExerciseComponent,
  },

  mounted() {
    const data = this.data as WorkoutNeat
    this.workout.importWorkout(data)

    this.startWorkoutLog()
    this.$watch('finished', (finished: boolean) => {
      if (finished) {
        this.endWorkoutLog()
      }
    })
    console.log('unwrappet exercises', this.workout.unwrapped)
    this.exercises = this.workout.unwrapped.map((_exercise: Exercise) => {
      let exercise = new ExerciseStatus()

      ;(exercise._id = _exercise._id),
        (exercise._name = _exercise._name),
        (exercise._reps = _exercise._reps),
        (exercise._time = _exercise._time),
        (exercise._preset = _exercise._preset),
        (exercise._meta = _exercise._meta)

      return exercise
    })

    this.exercisePointer = 0
    this.run()
    this.focusActive()
    this.currentExercise.startTimer()
  },

  methods: {
    next(index: number) {
      this.exercisePointer = index + 1
      if (this.finished) {
        this.exercises.forEach((exercise) => {
          exercise.status = 'past'
        })
      } else {
        this.currentExercise.startTimer()
      }
    },
    focusActive() {
      !this.finished
        ? (this.exercises[this.exercisePointer].status = 'running')
        : false
      this.exercisePointer > 0
        ? (this.exercises[this.exercisePointer - 1].status = 'past')
        : false
      this.exercisePointer > 1
        ? (this.exercises[this.exercisePointer - 2].status = 'past')
        : false
      this.exercisePointer < this.exercises.length - 1
        ? (this.exercises[this.exercisePointer + 1].status = 'next')
        : false
    },

    whenRepResponse(reps: number, index: number) {
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
          workout_id: this.data.id as string,

          started: Date.now(),
        },
      })
        .then((collections: Collections) => {
          this.logId = collections.workout_logs[0].$id
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
            .then(() => {
              //
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
        return true
      } else {
        return false
      }
    },

    currentExercise(): ExerciseStatus {
      return this.exercises[this.exercisePointer]
    },

    finished(): boolean {
      return this.exercisePointer >= this.exercises.length
    },
  },
  setup() {
    const workout = new Workout()
    return {
      workout,
    }
  },
})
</script>

<style lang="scss">
.workout {
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
