<template>
  <g-page title="Settings">
    <q-card>
      <q-card-section>
        <q-list bordered>
          <settings-cathegory
            v-for="cathegory in cathegories"
            :key="cathegory"
            :cathegory="cathegory"
          />
        </q-list>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        You prabably want to Backup your Data before updating, since this is an early alpha.
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          label="Backup/Restore"
          color="amber"
          @click="$router.push({ name: 'backup' })"
        />
      </q-card-actions>
    </q-card>
  </g-page>
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
