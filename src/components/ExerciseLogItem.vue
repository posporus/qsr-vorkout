<template>
  <q-item>
    <q-item-section>
      <q-item-label>
        {{ exerciseLog.$id }},
        {{ exerciseLog.workout_log_id}}
      </q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        {{ duration }}
      </q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label v-if="exerciseLog.reps">
          Reps:
        {{ exerciseLog.reps }}
      </q-item-label>
    </q-item-section>

    <q-item-section>
      <q-btn @click="removeLog(exerciseLog.$id)" icon="delete" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ExerciseLogModel } from 'src/store/models'
import moment from 'moment'

export default defineComponent({
  mounted() {
    //
  },
  props: {
    exerciseLog: {
      type: ExerciseLogModel,
      required: true,
    },
  },
  computed: {
    duration(): string {
      if (this.exerciseLog.ended) {
        const started = moment(this.exerciseLog.started)
        const ended = moment(this.exerciseLog.ended)

        const diff = ended.diff(started)
        const duration = moment.duration(diff, 'milliseconds')
        console.log(started, ended, diff, duration)
        return duration.seconds().toString() + 's'
      } else {
        return 'running'
      }
    },
  },
  methods: {
    removeLog(id: string | null): void {
      ExerciseLogModel.delete(id || '')
        .then(() => {
          console.log('deleted')
        })
        .catch((err) => console.error(err))
    },
  },
})
</script>

<style lang="scss"></style>
#
