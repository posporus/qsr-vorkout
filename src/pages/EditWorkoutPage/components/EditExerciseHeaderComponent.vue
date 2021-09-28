<template>
  <q-item>
    <q-item-section>
        {{label}}
    </q-item-section>
    <q-item-section side>
        <q-icon :name="icon" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

//import _ from 'lodash'

export default defineComponent({
  name: 'EditExerciseHeaderCompoenent',
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped></style>
