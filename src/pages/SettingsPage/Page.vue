<template>
  <q-page>
    <div class="text-h4">Settings</div>
    <q-list bordered>
      <settings-cathegory
        v-for="cathegory in cathegories"
        :key="cathegory"
        :cathegory="cathegory"
      />
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SettingsCathegory from './components/SettingsCathegory.vue'
import { user_settings_cathegories } from 'src/static/userSettings'

export default defineComponent({
  name: 'PreferencesPage',
  data() {
    return {
      cathegories: user_settings_cathegories,
    }
  },
  components: {
    SettingsCathegory,
  },
})
</script>

<style lang="scss" scoped></style>
