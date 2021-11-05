<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <q-tab-panels v-model="currentPanel" animated>
          <q-tab-panel name="tab">
            <tab-layout/>
          </q-tab-panel>
          <q-tab-panel name="sub">
            <sub-layout/>
          </q-tab-panel>
        </q-tab-panels>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, watch, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

import SubLayout from 'src/layouts/SubLayout'
import TabLayout from 'src/layouts/TabLayout'

export default defineComponent({
  name: 'MainLayout',
  components: {
    SubLayout,
    TabLayout
  },
  setup() {
    const route = useRoute()
    const currentPanel: Ref<'sub' | 'tab'> = ref('tab')

    watch(
      () => route.matched,
      (matched) => {
        currentPanel.value = matched[1]?.path === '/drawer/' ? 'sub' : 'tab'
        console.log('route chna',currentPanel.value)
      }
    )
    return {
      currentPanel
    }
  }
})
</script>
