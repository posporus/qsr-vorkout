<template>
  <q-list class="edit-exercise-list" bordered>
    <exercise-edit-header-component
      :label="preset?.label"
      :icon="preset?.icon"
      :class="'bg-' + preset?.color"
    />
    <q-item>
      <q-input v-model="exercise.time" />
    </q-item>
    <select-dialog-component
      v-model="exercise.id"
      v-model:show="showExerciseSelect"
    />
  </q-list>
</template>

<script lang="ts">
import { ExerciseInterface } from 'src/types'
import { defineComponent, ref, Ref } from 'vue'
import ExerciseEditHeaderComponent from './EditExerciseHeaderComponent.vue'
import SelectDialogComponent from './SelectDialogComponent.vue'
import presets from 'src/static/presets'
import { Preset } from 'src/types'

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
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  mounted() {
    if (this.exercise.preset !== 'rest' && this.exercise.id === undefined)
      this.exercise.id = ''
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
      'set',
      (exercise: ExerciseInterface) => {
        this.$emit('update:modelValue', exercise)
      },
      { deep: true }
    )
  },
  methods: {
    //
  },
  computed: {
    preset(): Preset | undefined {
      return presets.find((el) => el.name === this.exercise.preset)
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
