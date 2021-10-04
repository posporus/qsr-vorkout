<template>
<div>
  <q-item-label header>{{ cathegory?.label }}</q-item-label>

  <setting-item
    v-for="setting in entries"
    :key="setting.key"
    :setting="setting"
  />
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import {
  user_settings,
  SettingDefault,
  SettingsCathegory,
} from 'src/static/userSettings'
import SettingItem from './SettingItem.vue'

export default defineComponent({
  name: 'SettingCathegory',
  data() {
    return {
      //settingValue:null
    }
  },
  components: {
    SettingItem,
  },
  props: {
    cathegory: {
      type: Object as PropType<SettingsCathegory>,
      required: true,
    },
  },
  computed: {
    entries() {
      console.log(user_settings)
      return user_settings.filter((e: SettingDefault) => {
        //console.log(e.cathegory,this.cathegory?.name)
        return e.cathegory === this.cathegory?.name
      })
    },
  },
})
</script>

<style></style>
