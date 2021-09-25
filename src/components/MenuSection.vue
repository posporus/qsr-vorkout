<template>
  <q-item
    v-for="(entry, index) in menuSectionEntrys"
    :key="index"
    clickable
    v-ripple
    @click="$router.push({ path: entry.path })"
  >
    <q-item-section avatar>
      <q-avatar :icon="entry.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ entry.label }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name:'MenuSection',
  props: ['menuSectionEntrys'],
})
</script>

<style lang="scss"></style>
