<template>
  <q-list>
    <q-item class="bg-white text-black">
      <q-item-section>
        <div class="text-h4 font-serif">
          Happy <img class="logo" src="./../../../assets/turtle.svg" /> Torture
        </div>
      </q-item-section>
    </q-item>
    <q-separator />
    <menu-section
      :menuSectionEntrys="[
        {
          label: 'Overview',
          path: '/',
          icon: 'preview',
        },
        {
          label: 'My Workouts',
          path: '/my-workouts',
          icon: 'directions_run',
        },
        /**{
          label: 'My Logs',
          path: '/my-logs',
          icon: 'auto_stories',
        },*/
        {
          label: 'My Exercises',
          path: '/my-exercises',
          icon: 'fitness_center',
        },
        {
          label: 'Diary',
          path: '/diary',
          icon: 'date_range',
        },
        /*
        {
          label: 'Statistics',
          path: '/statistics',
          icon: 'insights',
        },*/
      ]"
    />

    <q-separator inset />
    <menu-section
      :menuSectionEntrys="[
        {
          label: 'Settings',
          path: '/settings',
          icon: 'settings',
        },
      ]"
    />
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuSection from 'components/MenuSection.vue'

export default defineComponent({
  components: { MenuSection },
  data() {
    return {
      menuOpen: false,
    }
  },
})
</script>

<style lang="scss">
.logo {
  display: inline;
  width: 1.8rem;
  margin-left: 0.4rem;
}
</style>
