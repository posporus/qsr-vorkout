<template>
    <q-badge color="red">
       v{{version}}
    </q-badge>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import packageInfo from '../../package.json'
export default defineComponent({
  name: 'DisplayVersion',

  setup() {
    return {
      version: packageInfo.version
    }
  },
})
</script>

<style lang="scss"></style>
