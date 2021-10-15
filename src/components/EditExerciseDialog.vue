<template>
  <q-dialog v-model="dialogOpen">
    <q-card>
      <q-card-section>
        <div class="text-h4">Edit Exercise</div>
        <q-list>
          <q-item>
            <q-input ref="exercise-name" label="Name" v-model="exercise.name" :rules="[val => !!val || 'Field is required']" />
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Countable</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle
                color="green"
                v-model="exercise.countable"
                val="friend"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <category-select-component v-model="exercise.categories" />
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn @click="saveExercise">save</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CategoryModel, ExerciseModel } from 'src/store/models'
import CategorySelectComponent from './CategorySelectComponent.vue'
//import {OptionInterface} from './CategorySelectComponent.vue'

import { CategoryOptionInterface } from 'src/types'
interface Exercise {
  name: string
  countable: boolean
  categories: CategoryOptionInterface[]
}

export default defineComponent({
  name: 'EditExerciseDialog',
  data() {
    return {
      exercise: {
        name: '',
        countable: true,
        categories: [],
      } as Exercise,
      dialogOpen: false,
    }
  },
  components: {
    CategorySelectComponent,
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

      const categories = CategoryModel.findIn(
        this.exercise.categories.map((category: CategoryOptionInterface): string => {
          return category.value
        })
      )
      console.log('categories', categories)
      ExerciseModel.insert({
        data: {
          name: this.exercise.name,
          categories: categories,
        },
      })
        .then((entities) => {
          console.log('entities',entities)
          this.dialogOpen = false
          this.$q.notify('Exercise created.')
        })
        .catch((err) => console.error(err))
    },
  },
})
</script>

<style lang="scss"></style>
