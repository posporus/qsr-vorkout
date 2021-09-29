<template>
  <q-slide-item @right="$emit('remove')" ref="exerciseSlider">
    <template v-slot:right>
      <q-icon name="delete" />
    </template>
    <q-separator />
    <q-card>
      <exercise-edit-header-component
        :preset="preset"
        :exercise-details="exerciseDetails"
      />

      <q-item v-if="preset?.timer">
        <q-item-section>
          <time-input-component v-model="exercise.time" />
        </q-item-section>
      </q-item>

      <q-item v-if="preset?.reps">
        <q-item-section>
          <input-spinner-component label="Reps" v-model="exercise.reps" />
        </q-item-section>
      </q-item>

      <select-dialog-component
        v-model="exercise"
        v-model:show="showExerciseSelect"
        @remove="$emit('remove')"
        :preset="preset"
      />
    </q-card>
  </q-slide-item>
</template>

<script lang="ts">
import { ExerciseInterface } from 'src/types'
import { defineComponent, ref, Ref } from 'vue'
import ExerciseEditHeaderComponent from './EditExerciseHeaderComponent.vue'
import SelectDialogComponent from './SelectDialogComponent.vue'
import presets from 'src/static/presets'
import { Preset, preset } from 'src/types'
import { ExerciseModel } from 'src/store/models'
import { Item } from '@vuex-orm/core'
import TimeInputComponent from 'src/components/TimeInputComponent.vue'
import InputSpinnerComponent from 'components/InputSpinnerComponent.vue'
import { QSlideItem } from 'quasar'

export default defineComponent({
  name: 'EditExerciseCompoenent',
  data() {
    return {
      showExerciseSelect: false,
    }
  },
  components: {
    ExerciseEditHeaderComponent,
    SelectDialogComponent,
    TimeInputComponent,
    InputSpinnerComponent,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue', 'remove'],
  updated() {
    /**
     * this is a workaround for the slide stuck bug (#WA-44)
     * it makes that the slide goes back
     */
    ;(this.$refs.exerciseSlider as QSlideItem).reset()
  },
  mounted() {
    //if this is a new exercise
    if (
      this.exercise.id === undefined &&
      this.exercise.reps === undefined &&
      this.exercise.time === undefined
    ) {
      this.exercise = this.loadDefaults(this.exercise.preset || 'timer')
    }
    //if no id is yet set. (preset 'rest' id === undefined, so no selectDialog pops up)
    if (this.exercise.id === '') this.showExerciseSelect = true

    this.$watch(
      'exercise.id',
      () => {
        console.log('exercise change')

        this.showExerciseSelect = false
      },
      { deep: true }
    )
    this.$watch(
      'modelValue',
      (modelValue: ExerciseInterface) => {
        this.exercise = modelValue
      },
      { deep: true }
    )
    this.$watch(
      'exercise',
      (exercise: ExerciseInterface) => {
        this.$emit('update:modelValue', exercise)
      },
      { deep: true }
    )
  },
  methods: {
    loadDefaults(_preset: preset): ExerciseInterface {
      const exerciseDefaults: { [key: string]: ExerciseInterface } = {
        timer: {
          preset: 'timer',
          id: '',
          reps: undefined,
          time: 30,
        },
        rest: {
          preset: 'rest',
          id: undefined,
          reps: undefined,
          time: 30,
        },
        repCount: {
          preset: 'repCount',
          id: '',
          reps: 8,
          time: undefined,
        },
        repsInTime: {
          preset: 'repsInTime',
          id: '',
          reps: 8,
          time: 30,
        },
      }
      return exerciseDefaults[_preset]
    },
  },
  computed: {
    preset(): Preset | undefined {
      return presets.find((el) => el.name === this.exercise.preset)
    },
    exerciseDetails(): Item<ExerciseModel> {
      return ExerciseModel.find(this.exercise.id || '')
    },
  },
  setup(props) {
    const exercise: Ref<ExerciseInterface> = ref(props.modelValue)
    return {
      exercise,
    }
  },
})
</script>

<style lang="scss" scoped></style>
