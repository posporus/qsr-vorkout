<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        
          <q-toolbar-title>
            {{ $route.meta?.title || 'Vorkout' }}
          </q-toolbar-title>
      
        <display-version @click="$router.push({ path: '/changelog' })"/>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="white">
      <main-menu v-model="leftDrawerOpen" />
    </q-drawer>
    <q-page-container>

      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          appear
          :duration="150"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import MainMenu from './components/MainMenu.vue'
import DisplayVersion from 'components/DisplayVersion.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    MainMenu,
    DisplayVersion
    //
  },

  setup() {
    const leftDrawerOpen = ref(false)
   

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
})
</script>
