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
import { defineComponent, PropType } from 'vue'
import { MenuSectionEntry } from 'src/types'

export default defineComponent({
  name: 'MenuSection',
  //props: ['menuSectionEntrys'],
  props: {
    menuSectionEntrys: {
      type: Object as PropType<MenuSectionEntry[]>,
      required: true,
    },
  },
})
</script>

<style lang="scss"></style>
