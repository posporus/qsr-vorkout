<template>
  <q-item dense>
    <q-item-section>
      <q-item-label>
        {{ setting.label }}
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-select v-model="value" :options="options" label="Standard" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import type { SettingDefault } from 'src/static/userSettings'
import type { DropDownValue, DropDownOption } from './'

export default defineComponent({

  name: 'DropDown',
  props: {
    modelValue: {
      type: String as PropType<DropDownValue>,
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
      get: function (): DropDownOption | undefined {
        return this.getOptionFromValue(this.modelValue)
      },
      set: function (val: DropDownOption) {
        this.$emit('update:modelValue', val.value)
      },
    },
    options() {
      return this.setting.options
    }
  },
  methods: {
    getOptionFromValue(value:DropDownValue) {
      const options:DropDownOption[] = this.setting.options || []
      return options.find(element => element.value === value)
       
    }
  }
})
</script>

<style></style>
