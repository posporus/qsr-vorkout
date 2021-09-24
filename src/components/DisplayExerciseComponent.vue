<template>
  
  <div
    class="exercise column items-center justify-evenly"
    :class="status + ' bg-' + exercise.preset.color"
  >
    <div class="col">
      <title-component
        :status="status"
        :title="exercise.preset.defaultName || exercise.name"
        :icon="exercise.preset.icon"
      />
    </div>

    <div class="col-auto">
      log-ID: {{ workoutLogId }} setCount: {{ exercise.setCount }} #
      {{ exercise.exerciseCount }} ID: {{ exercise.id }}
      <timer-component
        v-if="exercise.hasTimer"
        :time="exercise.time"
        :active="timerActive"
        :key="exercise.id"
        @timeisup="whenTimeisup"
        :status="status"
      />
    </div>

    <div class="col column">
      <reps-component
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
    <next-label :status="status" />
    <background-component
      :icon="exercise.preset.icon"
      :color="exercise.preset.color"
    />
  </div>

</template>

<script lang="ts">
//type Status = 'inqueue' | 'next' | 'running' | 'past'
import TitleComponent from './WorkoutTitleComponent.vue'
import RepsComponent from './DisplayRepsComponent.vue'
import TimerComponent from 'components/DisplayTimerComponent.vue'
import NextLabel from './NextExerciseLabel.vue'
import BackgroundComponent from 'components/ui/BackgroundComponent.vue'
import { Collections } from '@vuex-orm/core'

import { ExerciseStatus } from 'src/classes'
import {
  ExerciseLogModel,
  ExerciseModel,
  WorkoutLogModel,
} from 'src/store/models'
//import { Status } from '../../classes/ExerciseStatus'
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      //status: 'inqueue' as Status
      timeisup: false,
      exerciseLogId: null as string | null,
      //repResponse: false
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
    TimerComponent,
    RepsComponent,
    TitleComponent,
    NextLabel,
    BackgroundComponent,
  },
  mounted() {
    this.$watch('workoutLogId', (workoutLogId: string) => {
      console.log('workout log id changed.', workoutLogId)
      this.logAct(this.status || 'inqueue')
    })
    this.$watch('status', (currentStatus: string) => {
      console.log('status changed', currentStatus)
      this.logAct(currentStatus)
    })
  },

  methods: {
    whenTimeisup() {
      this.timeisup = true
      this.next()
      //else
      if (!this.exercise?.hasReps) {
        this.focusActive()
      }
    },
    whenRepResponse(reps: number) {
      console.log('whenRepResponse Exercise', reps)
      //this.repResponse = true
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
        //console.log('should stop this',this.exerciseLogId)
        this.endExerciseLog(this.exerciseLogId || 'no log id')
      }
    },
    startExerciseLog() {
      console.log(
        'exercise model(start log)',
        ExerciseModel.find(this.exercise.id)
      )
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

          console.log('exercise log id try:', collections.exercise_logs[0].$id)
          //this.log = log.workout_log
          //console.log('log started.', log);
        })
        .catch((err) => console.log(err))
    },
    endExerciseLog(exerciseLogId: string) {
      console.log('end exercise log', exerciseLogId)
      this.exerciseLogId
        ? ExerciseLogModel.update({
            where: this.exerciseLogId,
            data: {
              ended: Date.now(),
            },
          })
            .then((log) => {
              console.log('exercise log ended.', log)
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
            .then((log) => {
              console.log('reps set.', log)
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
