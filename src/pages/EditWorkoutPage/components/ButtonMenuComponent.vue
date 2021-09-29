<template>
  <q-btn-group rounded spread>
    <q-btn
      v-for="preset in presets"
      :color="preset.color"
      rounded
      :icon="preset.icon"
      :key="preset.name"
      @click="$emit('click', preset.name)"
    >
      <!--  <div class="text-caption">{{ preset.label}}</div>-->
    </q-btn>
  </q-btn-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import presets from 'src/static/presets'

//import _ from 'lodash'

export default defineComponent({
  name: 'ButtonMenuCompoenent',
  emits: ['click'],
  setup() {
    return {
      presets,
    }
  },
})
</script>

<style lang="scss" scoped></style>
