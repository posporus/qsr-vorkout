<template>
  <q-dialog v-model="dialogOpen">
    <q-card>
      <div class="text-h4">Edit Exercise</div>
      <q-card>
        <q-form>
          <q-input label="Name" v-model="exercise.name" />
        </q-form>
        <q-btn @click="saveExercise" type="submit">save</q-btn>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExerciseModel from 'src/store/models/ExerciseModel'
interface Exercise {
  name: string
}

export default defineComponent({
  name: 'EditExerciseDialog',
  data() {
    return {
      exercise: {
        name: '',
      } as Exercise,
      dialogOpen: false,
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  mounted() {
    this.$watch('modelValue', (modelValue: boolean) => {
      this.dialogOpen = modelValue
    })
    this.$watch('dialogOpen', (dialogOpen: boolean) => {
      this.$emit('update:modelValue', dialogOpen)
    })
  },
  methods: {
    saveExercise() {
      ExerciseModel.insert({
        data: {
          name: this.exercise.name,
        },
      })
        .then(() => {
          this.dialogOpen = false
          this.$q.notify('Exercise created.')
        })
        .catch((err) => console.error(err))
    },
  },
})
</script>

<style lang="scss"></style>
