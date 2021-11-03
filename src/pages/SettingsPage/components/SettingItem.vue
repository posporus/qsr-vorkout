<template>
  <component :is="this.setting.component" :setting="setting" v-model="value" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SettingsModel from 'src/store/models/SettingsModel'
import { getSetting } from 'src/utility'

import type { SettingDefault, settingValue } from 'src/static/userSettings'

export default defineComponent({
  name: 'SettingItem',
  props: {
    setting: {
      type: Object as PropType<SettingDefault>,
      required: true,
    },
  },
  computed: {
    value: {
      get: function (): settingValue {
        return getSetting(this.setting.key)
      },
      set: function (val: settingValue) {
        void SettingsModel.insert({
          data: {
            key: this.setting.key,
            value: val,
          },
        })

        console.log('set ', val, this.setting.key)
      },
    },
  },
  /* setup(props) {
    const settingComponent:Component = props.setting.component
    return {
      settingComponent,
    }
  }, */
})
</script>

<style></style>
