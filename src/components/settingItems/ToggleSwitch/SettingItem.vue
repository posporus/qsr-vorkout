<template>
  <q-item dense>
    <q-item-section>
      <q-item-label>
        {{ setting.label }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-toggle color="blue" v-model="value" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import type { SettingDefault } from 'src/static/userSettings'
import type { ToggleSwitchValue } from './'

export default defineComponent({
  name: 'SettingToggleSwitch',

  props: {
    modelValue: {
      type: Boolean as PropType<ToggleSwitchValue>,
      required: true,
    },
    setting: {
      type: Object as PropType<SettingDefault>,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    value: {
      get: function (): ToggleSwitchValue {
        return this.modelValue
      },
      set: function (val: ToggleSwitchValue) {
        this.$emit('update:modelValue', val)
      },
    },
    options() {
      return this.setting.options
    },
  },
})
</script>

<style></style>
