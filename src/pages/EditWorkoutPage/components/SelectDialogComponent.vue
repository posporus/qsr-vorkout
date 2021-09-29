<template>
  <q-dialog v-model="showDialog">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header>
        <q-toolbar>
          <q-avatar :icon="preset.icon" :color="preset.color" />
          <q-input
            dark
            dense
            standout
            v-model="searchTerm"
            input-class="text-right"
            class="q-ml-md"
          >
            <template v-slot:append>
              <q-icon v-if="searchTerm === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="text = ''"
              />
            </template>
          </q-input>
          <!--
          <q-input dense v-model="searchTerm" label="search" clearable>
            <template v-slot:prepend>
              <q-icon size="sm" name="search" />
            </template>
          </q-input>
          -->
          <q-btn flat @click="showDialog = false" icon="clear"/>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <select-exercise-component v-model="exercise.id" />
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import SelectExerciseComponent from './SelectExerciseComponent.vue'
import { ExerciseInterface } from 'src/types'
export default defineComponent({
  components: { SelectExerciseComponent },
  name: 'SelectDialogComponent',
  data() {
    return {
      searchTerm: '',
      showDialog: false,
    }
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    preset: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue', 'update:show','remove'],
  mounted() {
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

    this.$watch('showDialog', (showDialog: boolean) => {
      console.log('exerciseID',this.exercise.id)
      if(!showDialog && this.exercise.id === '') this.$emit('remove')
      this.$emit('update:show', showDialog)
    })
    this.$watch('show', (show: boolean) => {
      this.showDialog = show
    })
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
