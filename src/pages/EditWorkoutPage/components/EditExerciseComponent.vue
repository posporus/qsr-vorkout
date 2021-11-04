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
import { defineComponent, ref, Ref, PropType } from 'vue'
import ExerciseEditHeaderComponent from './EditExerciseHeaderComponent.vue'
import SelectDialogComponent from './SelectDialogComponent.vue'
import presets from 'src/static/presets'
import { ExerciseNeat, Preset, preset } from 'src/types'
import { ExerciseModel } from 'src/store/models'
import { Item } from '@vuex-orm/core'
import TimeInputComponent from 'src/components/TimeInputComponent.vue'
import InputSpinnerComponent from 'components/InputSpinnerComponent.vue'
import { QSlideItem } from 'quasar'
import _ from 'lodash'
import { nanoid } from 'nanoid'


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
      type: Object as PropType<ExerciseNeat>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'remove'],
  updated() {
    /**
     * this is a workaround for the slide stuck bug (#WA-44)
     * it makes that the slide goes back
     * 
     * TOTO: obsolete since this bug is fixed.
     */
    ;(this.$refs.exerciseSlider as QSlideItem).reset()
  },
  mounted() {
    console.log('mounted')
    //if this is a new exercise (cause exercises.push({preset:preset}))
    if (
      this.exercise.id === '' &&
      this.exercise.reps === undefined &&
      this.exercise.time === undefined
    ) {
      this.exercise = this.loadDefaults(this.exercise.preset || 'timer')
      //console.log(this.loadDefaults(this.exercise.preset || 'timer'),this.exercise)
    }
    //if no id is yet set. (preset 'rest' id === undefined, so no selectDialog pops up)
    if (this.exercise.preset !== 'rest' && !this.exercise.id) this.showExerciseSelect = true

    this.$emit('update:modelValue', this.exercise)
    this.$watch(
      'modelValue',
      (modelValue: ExerciseNeat) => {
        this.exercise = modelValue
      },
      { deep: true }
    )
    this.$watch(
      'exercise',
      (exercise: ExerciseNeat) => {
        this.$emit('update:modelValue', exercise)
        console.log('updated exercise.',exercise)
        this.showExerciseSelect = false
      },
      { deep: true }
    )
  },
  methods: {
    loadDefaults(_preset: preset): ExerciseNeat {
      const exerciseDefaults: { [key: string]: ExerciseNeat } = {
        timer: {
          preset: 'timer',
          id: '',
          reps: undefined,
          time: 30,
        },
        rest: {
          preset: 'rest',
          id: '',
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
      
      const defaults:ExerciseNeat = {
        key: this.exercise.key || nanoid(6),
        ...exerciseDefaults[_preset]
        }
        console.log('loadDefault', defaults)
      return _.cloneDeepWith(defaults)
    },
  },
  computed: {
    preset(): Preset | undefined {
      return _.cloneDeepWith(presets.find((el) => el.name === this.exercise.preset))
    },
    exerciseDetails(): Item<ExerciseModel> {
      return ExerciseModel.find(this.exercise.id || '')
    },
  },
  setup(props) {
    const exercise: Ref<ExerciseNeat> = ref(props.modelValue)
    return {
      exercise,
    }
  },
})
</script>

<style lang="scss" scoped></style>
