<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { StatusBar } from '@capacitor/status-bar'
import { KeepAwake } from '@capacitor-community/keep-awake'
import { getSetting } from 'src/utility'
export default defineComponent({
  name: 'FullscreenLayout',
  mounted() {
    //TODO
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    getSetting('workout/hideStatusBar') ? void StatusBar.hide() : false
    void KeepAwake.keepAwake()
  },
  unmounted() {
    void StatusBar.show()
    void KeepAwake.allowSleep()
  },
})
</script>

<style></style>
