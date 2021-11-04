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
import SettingsModel from 'src/store/models/SettingsModel'
import { getSetting } from 'src/utility'

import { SettingDefault, settingValue } from 'src/static/userSettings'

type SettingToggleSwitchValue = boolean

export {
  SettingToggleSwitchValue
}

export default defineComponent({
  name: 'SettingToggleSwitch',
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
        /*
        const defaultVal: value = user_settings.find(
          (e: SettingDefault) => e.key === this.setting.key
        )?.default
        
        if (defaultVal !== undefined) {
          const val: value = SettingsModel.find(this.setting.key)?.value
          console.log(val, defaultVal)
          if (val !== undefined) {
            return val
          } else return defaultVal
        } else {
          return undefined
        }*/
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
})
</script>

<style></style>
