<template>
  <q-card class="set" bordered>
    <q-card-section>
      <q-input label="number of sets" v-model="set.sets" type="number" />
    </q-card-section>
    <q-card-section>

    
    <draggable
      :list="set.exercises"
      item-key="id"
      @start="drag = true"
      @end="drag = false"
      group="exercises"
    >
      <template #item="{ index }">
        <edit-exercise-component
        v-model="set.exercises[index]"
        />
      </template>
    </draggable>
    </q-card-section>
    <q-card-section>
      <!--<q-btn @click="addRest">Add Rest</q-btn>-->
      <button-menu-component @click="preset => set.exercises.push({preset:preset})"/>
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
        ..._.cloneDeep(set_defaults)
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
  },
  emits: ['update:modelValue'],
  mounted() {
    this.$watch('modelValue', (modelValue: SetInterface) => {
      this.set = modelValue
    },{deep:true})
    this.$watch('set', (set: SetInterface) => {
      this.$emit('update:modelValue', set)
    },{deep:true})
  },
  methods: {
    addExercise() {
      //
    },
    addRest() {
      this.set.exercises.push({
        id:'',
        isRest: true,
        time: 30,
      })
    },
  },
  
})
</script>

<style lang="scss" scoped>
.set {
  border-radius: 16px;
  margin-bottom: 10px;
}
</style>
