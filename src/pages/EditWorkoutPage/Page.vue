<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-input label="Name" v-model="workout.name" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <draggable
          :list="workout.sets"
          item-key="id"
          @start="drag = true"
          @end="drag = false"
          group="sets"
          handle=".set-handle"
        >
          <template #item="{ index }">
            <div>
              <edit-set-component
                v-model="workout.sets[index]"
                @remove="this.workout.sets.splice(index, 1)"
                :removable="this.workout.sets.length > 1"
              />
              <q-item>
                <q-item-section class="items-center">
                  <q-btn
                    @click="workout.sets.splice(1, 0, { ...set_defaults })"
                    icon="add"
                    round
                  />
                </q-item-section>
              </q-item>
            </div>
          </template>
        </draggable>
      </q-card-section>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        @click="saveWorkout"
        :disable="savedWorkout"
        :icon="savedWorkout ? 'check' : 'save'"
        round
        :color="savedWorkout ? 'green' : 'red'"
      />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import _ from 'lodash'
import draggable from 'vuedraggable'
//import {nanoid} from 'nanoid'
import EditSetComponent from './components/EditSetComponent.vue'
import { WorkoutModel } from 'src/store/models'
import { nanoid } from 'nanoid'
import { SetInterface, WorkoutInterface } from 'src/types'

export default defineComponent({
  data() {
    return {
      workout: {} as WorkoutInterface,
      drag: false,
      savedWorkout: false,
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
  mounted() {
    if (this.id !== 'new') {
      const workout = WorkoutModel.find(this.dynamicId)
      this.workout.name = workout?.name.toString() || ''
      this.workout.id = workout?.id.toString() || ''
      this.workout.sets = _.cloneDeep(workout?.sets) || []
    } else {
      this.workout = this.workout_defaults
    }
    this.$watch(
      'workout',
      () => {
        this.savedWorkout = false
      },
      { deep: true }
    )
  },
  methods: {
    saveWorkout() { 
      if (WorkoutModel.query().where('name', this.workout.name).get().length > 0) {
        this.$q.notify(
          `Workout with name "${this.workout.name}" already exists.`
        )
      } else {
        void WorkoutModel.insert({
          data: {
            id: this.dynamicId,
            name: this.workout.name,
            sets: this.workout.sets,
          },
        }).then(() => {
          console.log('safed')
          this.$q.notify('Workout saved.')
          this.savedWorkout = true
        })
      }
    },
    /*
    removeSet() {
      if()
    }*/
  },
  computed: {
    dynamicId(): string {
      if (this.id === 'new') return nanoid()
      else return this.id
    },
  },
  setup() {
    const set_defaults: SetInterface = {
      sets: 3,
      exercises: [],
    }
    const workout_defaults: WorkoutInterface = {
      name: 'Unnamed Workout',
      sets: [{ sets: 3, exercises: [{ preset: 'rest' }] }],
    }
    return {
      set_defaults,
      workout_defaults,
    }
  },
})
</script>

<style lang="scss" scoped></style>
