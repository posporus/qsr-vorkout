<template>
  <q-page>

    <div class="text-h4">Edit Workout</div>
    <q-list>
      <q-item>
        <q-item-section>
          <q-input label="Name" v-model="workout.name" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="q-pa-md q-gutter-md">
      <draggable
        :list="workout.sets"
        item-key="id"
        @start="drag = true"
        @end="drag = false"
        group="sets"
      >
        <template #item="{ index }">
          <edit-set-component v-model="workout.sets[index]" />
        </template>
        <template #footer>
          <q-btn @click="addSet">Add</q-btn>
        </template>
      </draggable>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import _ from 'lodash'
import draggable from 'vuedraggable'
//import {nanoid} from 'nanoid'
import EditSetComponent from './components/EditSetComponent.vue'
import { workout_defaults, set_defaults } from 'src/static/defaults'

export default defineComponent({
  data() {
    return {
      workout: workout_defaults,
      drag: false,
    }
  },
  components: { EditSetComponent, draggable },
  name: 'EditWorkoutPage',
  props: {
    id: {
      type: String,
      default: 'new',
    },
  },

  methods: {
    addSet() {
      this.workout.sets.push({
        ..._.cloneDeep(set_defaults)
      })
      console.log(this.workout)
    },
  },
  
})
</script>

<style lang="scss" scoped></style>
