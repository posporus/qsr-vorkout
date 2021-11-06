<template>
  <div class="main-layout">
    <q-tab-panels v-model="currentPanel" animated keep-alive>
      <q-tab-panel class="main-tab" name="tab">
        <tab-layout />
      </q-tab-panel>
      <q-tab-panel class="main-tab" name="sub">
        <sub-layout />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SubLayout from 'src/layouts/SubLayout'
import TabLayout from 'src/layouts/TabLayout'

export default defineComponent({
  name: 'MainLayout',
  components: {
    SubLayout,
    TabLayout,
  },
  computed: {
    currentPanel() {
      return this.$route.matched[1]?.path === '/sub/' ? 'sub' : 'tab'
    }
  },
  /* setup() {
    const route = useRoute()
    const currentPanel: Ref<'sub' | 'tab'> = ref('tab')

    watch(
      () => route.matched,
      (matched) => {
        currentPanel.value = matched[1]?.path === '/sub/' ? 'sub' : 'tab'
        console.log('route chna', currentPanel.value)
      }
    )
    return {
      currentPanel,
    }
  }, */
})
</script>
<style lang="scss" scoped>
.main-layout {
  position:absolute;
  width: 100%;
  height: 100%;
  margin:0px;
  padding: 0px;
}
.main-tab {
  margin: 0px;
  padding: 0px;
}
</style>
