<template>
  <q-timeline-entry
    :title="!exerciseLog.isRest ? exerciseLog.exercise?.name : 'Rest'"
    :subtitle="$dayjs.duration(exerciseLog?.duration || 0).format('H:mm:ss')"
    :color="preset?.color || 'black'"
    :icon="preset?.icon"
    :side="exerciseLog.isRest ? 'right' : 'left'"
  >
    <q-item dense>
      <q-item-section>
        <div v-if="exerciseLog.reps">{{ exerciseLog.reps }} Reps</div>
      </q-item-section>
    </q-item>

  </q-timeline-entry>
</template>

<script lang="ts">
import { ExerciseLogModel } from 'src/store/models'
import { defineComponent } from 'vue'
import { getPresetFromName } from 'src/utility'
import { Preset } from 'src/types'

export default defineComponent({
  name: 'WorkoutLogTimelineComponent',
  props: {
    exerciseLog: {
      type: ExerciseLogModel,
      required: true,
    },
  },
  mounted() {
    console.log(this.exerciseLog?.preset)
  },
  computed: {
    preset(): Preset | null {
      return getPresetFromName(this.exerciseLog.preset || 'timer') //TODO
    },
  },
})
</script>
