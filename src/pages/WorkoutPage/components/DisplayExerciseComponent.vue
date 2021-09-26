<template>
  <div
    class="exercise column items-center justify-evenly"
    :class="status + ' bg-' + exercise.preset.color"
  >
    <div class="col">
      <workout-title-component
        :status="status"
        :title="exercise.preset.defaultName || exercise.name"
        :icon="exercise.preset.icon"
      />
    </div>

    <div class="col-auto">
      log-ID: {{ workoutLogId }} setCount: {{ exercise.setCount }} #
      {{ exercise.exerciseCount }} ID: {{ exercise.id }}
      <display-timer-component
        v-if="exercise.hasTimer"
        :time="exercise.time"
        :active="timerActive"
        :key="exercise.id"
        @timeisup="whenTimeisup"
        :status="status"
      />
    </div>

    <div class="col column">
      <display-reps-component
        v-if="exercise.hasReps"
        :reps="exercise.reps"
        :disable="
          status === 'inqueue' ||
          status === 'next' ||
          (exercise.hasTimer && !timeisup)
        "
        @repResponse="
          (reps) => {
            whenRepResponse(reps)
          }
        "
        :status="status"
      />
    </div>
    <next-exercise-label-component :status="status" />
    <background-component
      :icon="exercise.preset.icon"
      :color="exercise.preset.color"
    />
  </div>
</template>

<script lang="ts">
//type Status = 'inqueue' | 'next' | 'running' | 'past'
import WorkoutTitleComponent from './WorkoutTitleComponent.vue'
import DisplayRepsComponent from './DisplayRepsComponent.vue'
import DisplayTimerComponent from './DisplayTimerComponent.vue'
import NextExerciseLabelComponent from './NextExerciseLabelComponent.vue'
import BackgroundComponent from 'components/BackgroundComponent.vue'
import { Collections } from '@vuex-orm/core'

import { ExerciseStatus } from 'src/classes'
import {
  ExerciseLogModel,
  ExerciseModel,
  WorkoutLogModel,
} from 'src/store/models'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DisplayExerciseComponent',
  data() {
    return {
      timeisup: false,
      exerciseLogId: null as string | null,
    }
  },

  props: {
    workoutLogId: {
      type: String,
      required: true,
    },
    exercise: {
      type: ExerciseStatus,
      required: true,
    },
    status: String,
    timerActive: Boolean,
  },

  components: {
    DisplayTimerComponent,
    DisplayRepsComponent,
    WorkoutTitleComponent,
    NextExerciseLabelComponent,
    BackgroundComponent,
  },
  mounted() {
    this.$watch('workoutLogId', () => {
      this.logAct(this.status || 'inqueue')
    })
    this.$watch('status', (currentStatus: string) => {
      this.logAct(currentStatus)
    })
  },

  methods: {
    whenTimeisup() {
      this.timeisup = true
      this.next()

      if (!this.exercise?.hasReps) {
        this.focusActive()
      }
    },
    whenRepResponse(reps: number) {
      console.log('whenRepResponse Exercise', reps)
      this.$emit('repResponse', reps)
      this.saveReps(reps)
      if (!this.exercise?.hasTimer) {
        this.next()
      }
      this.focusActive()
    },
    next() {
      this.$emit('next')
    },
    focusActive() {
      this.$emit('focusActive')
    },
    logAct(status: string) {
      console.log('logAct!', status, this.workoutLogId)
      if (status === 'running') {
        this.startExerciseLog()
      } else if (status === 'past') {
        this.endExerciseLog(this.exerciseLogId || 'no log id')
      }
    },
    startExerciseLog() {
      ExerciseLogModel.insert({
        data: {
          workout_log: WorkoutLogModel.find(this.workoutLogId),
          exercise: ExerciseModel.find(this.exercise.id),
          exerciseCount: this.exercise.exerciseCount,
          setCount: this.exercise.setCount,
          started: Date.now(),
        },
      })
        .then((collections: Collections) => {
          this.exerciseLogId = collections.exercise_logs[0].$id
        })
        .catch((err) => console.log(err))
    },
    endExerciseLog(exerciseLogId: string) {

      this.exerciseLogId
        ? ExerciseLogModel.update({
            where: exerciseLogId,
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
    saveReps(reps: number) {
      this.exerciseLogId
        ? ExerciseLogModel.update({
            where: this.exerciseLogId,
            data: {
              reps: reps,
            },
          })
            .then(() => {
              //
            })
            .catch((err) => console.log(err))
        : false
    },
  },
})
</script>

<style lang="scss">
.exercise {
  z-index: 1;
  position: absolute;
  //display: inline-block;
  padding: 20px;
  width: 100%;
  transition: all 0.5s;
  border-bottom: 5px solid black;
}
.exercise.inqueue {
  height: 30vh;
  top: 100vh;
}

.exercise.running {
  height: 70vh;
  top: 0vh;
}
.exercise.next {
  top: 70vh;
  height: 30vh;
}
.exercise.past {
  height: 0vh;
  top: 0vh;
}
</style>
