<!--
*unused*
-->

<template>
  <div>
      <q-form @input="$emit('update:modelValue', options)">
        <radio-tabs :data="presets"/>
      </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExerciseOptions from 'src/types/ExerciseOptions'
import { exercise_defaults } from 'src/static/defaults'
import RadioTabs from 'src/components/elements/RadioTabs.vue'
import {presets} from 'src/classes/PresetController'
export default defineComponent({
  data() {
    return {
      options: exercise_defaults,
      presets:presets
    };
  },
  components: {
    RadioTabs
  },
  props: {
    modelValue: {
        type: Object,
        default: exercise_defaults
    },
    noRest: {
        type: Boolean,
        default: false
    }
  },
  emits: ['update:modelValue'],
  computed: {
    //
  },
  beforeCreate() {
    //
  },
  mounted() {
    this.options = this.modelValue as ExerciseOptions
  },
  
});
</script>

<style></style>
