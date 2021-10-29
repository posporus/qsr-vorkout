<template>
  <q-page class="q-pa-md q-gutter-md">
    <q-input label="Name" v-model="workout.name" autofocus ref="self" @focus="$event.target.select()" />
    <q-separator />

    <q-list>
     
      <q-item-section>
        <draggable
          v-model="workout.sets"
          item-key="key"
          @start="drag = true"
          @end="drag = false"
          animation="200"
          group="sets"
          handle=".set-handle"
        >
          <template #item="{ element, index }">
            <div :key="element.key">
              <edit-set-component
                :drag="drag"
                v-model="workout.sets[index]"
                @remove="this.workout.sets.splice(index, 1)"
                :removable="this.workout.sets.length > 1"
              />
              <q-item>
                <q-item-section class="items-center">
                  <q-btn
                    @click="
                      workout.sets.splice(index + 1, 0, {
                        ...loadSetDefaults(),
                      })
                    "
                    icon="add"
                    round
                  />
                </q-item-section>
              </q-item>
            </div>
          </template>
        </draggable>
      </q-item-section>
    </q-list>
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
      console.log('workout', workout?.sets)
      this.workout.name = workout?.name.toString() || ''
      this.workout.id = this.dynamicId
      this.workout.sets = _.cloneDeep(workout?.sets || [])
      console.log('this.workout', this.workout)
    } else {
      this.workout = this.loadWorkoutDefaults()
    }
    this.$watch(
      'workout',
      () => {
        console.log('workout changed.', JSON.stringify(this.workout, null, 2))
        this.savedWorkout = false
        this.drag = false
      },
      { deep: true }
    )
  },
  methods: {
    /* selectInputValue(event:EventListenerObject){
      event.target.select()
    }, */
    saveWorkout() {
      /**
       * if workout with id exists
       */
      if (WorkoutModel.query().where('id', this.dynamicId).get().length > 0) {
        void WorkoutModel.update({
          where: this.dynamicId,
          data: {
            name: this.workout.name,
            sets: this.workout.sets,
          },
        }).then(() => {
          console.log('saved.')
          this.$q.notify('Workout updated.')
          this.savedWorkout = true
        })
      } else {
      /**
       * if workout with id doesnt exists
       */
        /**
         * if name is taken
         */
        if (
          WorkoutModel.query().where('name', this.workout.name).get().length > 0
        ) {
          this.$q.notify(
            `Workout with name "${this.workout.name}" already exists.`
          )
        } else {
        /**
         * if either name or id is taken
         */
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
      }
    },
    loadSetDefaults(): SetInterface {
      ///return _.cloneDeepWith(this.set_defaults)
      return _.cloneDeepWith({
        sets: 3,
        key: nanoid(6),
        exercises: [],
      })
    },
    loadWorkoutDefaults(): WorkoutInterface {
      return _.cloneDeepWith({
        name: 'Unnamed Workout',
        sets: [this.loadSetDefaults()],
      })
    },
  },
  computed: {
    dynamicId(): string {
      if (this.id === 'new') return nanoid()
      else return this.id
    },
  },
  /*
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
  },*/
})
</script>

<style lang="scss" scoped></style>
