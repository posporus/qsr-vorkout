<template>
<q-layout view="hHh lpR fFf">
  <q-page-container>

    <q-tab-panels v-model="tabModel" animated swipeable keep-alive>
      <q-tab-panel name="workouts">
        <my-workouts-page />
      </q-tab-panel>
      <q-tab-panel name="overview">
        <overview-page />
      </q-tab-panel>
      <q-tab-panel name="diary">
        <diary-page />
      </q-tab-panel>
    </q-tab-panels>

  </q-page-container>
  <q-footer>
    <q-toolbar>
      <q-btn icon="settings" flat />
      <q-separator vertical />
      <q-space />
      <q-tabs v-model="tabModel" align="justify">
        <q-tab name="workouts" icon="fitness_center"></q-tab>
        <q-tab name="overview" icon="preview"> </q-tab>
        <q-tab name="diary" icon="event_note"> </q-tab>
      </q-tabs>
    </q-toolbar>
  </q-footer>
</q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DiaryPage from 'src/pages/DiaryPage'
import MyWorkoutsPage from 'src/pages/MyWorkoutsPage'
import OverviewPage from 'src/pages/OverviewPage'
import { RouteRecordName } from 'vue-router'

export default defineComponent({
  name: 'TabLayout',
  components: {
    DiaryPage,
    MyWorkoutsPage,
    OverviewPage,
  },
  computed: {
    tabModel: {
      get(): RouteRecordName {
        //const routeName:RouteRecordName | null | undefined = this.$route.name
        return this.$route.name || 'overview'
      },
      set(name: string) {
        void this.$router.push({ name: name })
      },
    },
  },
})
</script>
