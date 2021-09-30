<template>
  <q-item class="bg-grey-2">
    <q-item-section avatar>
      <q-avatar size="md" :icon="preset?.icon" :color="preset?.color" />
    </q-item-section>
    <q-item-section v-if="preset?.name === 'rest'">
      <q-item-label class="text-weight-bold">
        {{ preset?.label }}
      </q-item-label>
      <q-item-label caption lines="2">
        {{ preset?.description }}
      </q-item-label>
    </q-item-section>
    <q-item-section v-else>
      <q-item-label class="text-weight-bold">
        {{ exerciseDetails?.name }}
        <q-badge transparent :label="preset?.label" :color="preset?.color"/>
      </q-item-label>

      <q-item-label caption>
        {{ preset?.description }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon name="drag_handle" class="exercise-handle" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

//import _ from 'lodash'

export default defineComponent({
  name: 'EditExerciseHeaderCompoenent',
  props: {
    preset: {
      type: Object,
      //required: true,
    },
    exerciseDetails: {
      type: Object,
      //required: true,
    },
  },
})
</script>

<style lang="scss" scoped></style>
