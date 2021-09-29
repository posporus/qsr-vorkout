<template>
  <q-card class="set" bordered>
    <q-item>
      <q-item-section>
        <q-input label="number of sets" v-model="set.sets" type="number" />
      </q-item-section>
      <q-item-section side>
        <q-btn :disable="!removable" icon="delete" round flat size="sm" @click="$emit('remove')"/>
      </q-item-section>
      <q-space/>
      <q-item-section side>
        <q-icon name="drag_handle" class="set-handle" />
      </q-item-section>
    </q-item>
    <q-list>
      <draggable
        :list="set.exercises"
        item-key="id"
        @start="drag = true"
        @end="drag = false"
        group="exercises"
        handle=".exercise-handle"
      >
        <template #item="{ index }">
          <edit-exercise-component
            v-model="set.exercises[index]"
            @remove="removeExercise(index)"
          />
        </template>
      </draggable>
    </q-list>
    <q-separator />
    <q-card-section>
      <q-item>
        <q-item-section>
          <button-menu-component
            @click="(preset) => set.exercises.push({ preset: preset })"
          />
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { set_defaults } from 'src/static/defaults'
import { SetInterface } from 'src/types'
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import _ from 'lodash'
import EditExerciseComponent from './EditExerciseComponent.vue'
import ButtonMenuComponent from './ButtonMenuComponent.vue'
//import SelectDialogComponent from './SelectDialogComponent.vue'
//import { Workout } from 'src/classes'

export default defineComponent({
  name: 'EditSetCompoenent',
  data() {
    return {
      set: {
        ..._.cloneDeep(set_defaults),
      } as SetInterface,
      drag: false,
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
      type:Boolean,

    }
  },
  emits: ['update:modelValue','remove'],
  mounted() {
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
        console.log(JSON.stringify(set, null, 2))
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
  },
})
</script>

<style lang="scss" scoped></style>
