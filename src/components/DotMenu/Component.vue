<template>
  <q-btn dense flat icon="more_horiz">
    <q-menu class="bg-primary text-white">
      <q-list>
        <menu-item v-for="item in items" :key="item.label" :item="item" />
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuItem from './components/MenuItem.vue'
import { DotMenuItem } from 'src/types'
export default defineComponent({
  name: 'DotMenu',
  components: {
    MenuItem,
  },
  setup() {
    const items: DotMenuItem[] = [
      {
        label: 'Settings',
        icon: 'settings',
        to: 'settings',
      },
      {
        label: 'Changelog',
        icon: 'change_history',
        to: 'changelog',
      },
    ]
    return {
      items,
    }
  },
})
</script>
