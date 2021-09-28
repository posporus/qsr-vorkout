<template>
  <q-dialog v-model="showDialog">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header>
        <q-toolbar>
          <q-input dense v-model="searchTerm" label="search" clearable>
            <template v-slot:prepend>
              <q-icon size="sm" name="search" />
            </template>
          </q-input>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <select-exercise-component v-model="selectedExercise"/>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SelectExerciseComponent from './SelectExerciseComponent.vue'

export default defineComponent({
  components: { SelectExerciseComponent },
  name: 'SelectDialogComponent',
  data() {
    return {
      searchTerm: '',
      showDialog: false,
      selectedExercise: '',
    }
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'update:show'],
  mounted() {
    this.$watch('selectedExercise', (selectedExercise: string) => {
      this.$emit('update:modelValue', selectedExercise)
    })
    this.$watch('modelValue', (modelValue: string) => {
      this.selectedExercise = modelValue
    })

    this.$watch('showDialog', (showDialog: boolean) => {
      this.$emit('update:show', showDialog)
    })
    this.$watch('show', (show: boolean) => {
      this.showDialog = show
    })
  },
})
</script>

<style lang="scss" scoped></style>
