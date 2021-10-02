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
export default defineComponent({
  name: 'FullscreenLayout',
  mounted() {
    void StatusBar.hide()
    void KeepAwake.keepAwake()
  },
  unmounted() {
    void StatusBar.show()
    void KeepAwake.allowSleep()
  },
})
</script>

<style></style>
