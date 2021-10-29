<template>
  <q-card class="set" bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar color="black" text-color="white" >
          {{set.sets}}x
          <q-popup-edit  v-model="set.sets" v-slot="scope" anchor="top left" buttons>
            <q-input label="number of sets" v-model="scope.value" autofocus dense type="number" @focus="$event.target.select()" @keyup.enter="scope.set"/>
          </q-popup-edit>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <!-- <q-input label="number of sets" v-model="set.sets" type="number" /> -->
      </q-item-section>
   
      <q-item-section side>
        <q-btn
          :disable="!removable"
          icon="delete"
          round
          flat
          size="sm"
          @click="$emit('remove')"
        />
      </q-item-section>
      <q-space />
      <q-item-section side>
        <q-icon name="drag_handle" class="set-handle" />
      </q-item-section>
    </q-item>
    <q-list>
      <draggable
        v-model="set.exercises"
        item-key="key"
        @start="dragThis = true"
        @end="dragThis = false"
        group="exercises"
        handle=".exercise-handle"
        animation="200"
      
      >
        <template #item="{ element, index }">
          <div :key="element.key">
            <edit-exercise-component
              v-model="set.exercises[index]"
              @remove="removeExercise(index)"
            />
          </div>
        </template>
      </draggable>
    </q-list>
    <q-separator />
    <q-card-section>
      <q-item>
        <q-item-section>
          <button-menu-component
            @click="
              (preset) => set.exercises.push(this.loadExerciseDefaults(preset))
            "
          />
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { SetInterface, ExerciseInterface, preset } from 'src/types'
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import _ from 'lodash'
import EditExerciseComponent from './EditExerciseComponent.vue'
import ButtonMenuComponent from './ButtonMenuComponent.vue'
import { nanoid } from 'nanoid'

//import SelectDialogComponent from './SelectDialogComponent.vue'
//import { Workout } from 'src/classes'

export default defineComponent({
  name: 'EditSetCompoenent',
  data() {
    return {
      set: this.modelValue as SetInterface,
      dragThis: false,
      //showExerciseSelect: false
    }
  },
  components: {
    draggable,
    EditExerciseComponent,
    ButtonMenuComponent,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    removable: {
      type: Boolean,
    },
    drag: Boolean
  },
  emits: ['update:modelValue', 'remove','update:drag'],
  mounted() {
    console.log('inside set Edit', this.set)
    this.$watch('dragThis',(dragThis:boolean) => {
      this.$emit('update:drag',dragThis)
    })
    this.$watch('drag',(drag:boolean) => {
      this.dragThis = drag
    })
    this.$watch(
      'modelValue',
      (modelValue: SetInterface) => {
        this.set = modelValue
      },
      { deep: true }
    )
    this.$watch(
      'set',
      (set: SetInterface) => {
        //console.log(JSON.stringify(set, null, 2))
        this.$emit('update:modelValue', set)
      },
      { deep: true }
    )
  },
  methods: {
    removeExercise(index: number) {
      this.set.exercises.splice(index, 1)
      //delete this.set.exercises[index]
    },
    loadExerciseDefaults(preset: preset): ExerciseInterface {
      return _.cloneDeepWith({
        preset: preset,
        key: nanoid(6),
      })
    },
  },
})
</script>

<style lang="scss" scoped></style>
