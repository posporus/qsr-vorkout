<template>
  
      <q-layout view="lHh Lpr lFf">
        <q-page-container>
          <q-page>
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
          </q-page>
        </q-page-container>
  
        <q-footer>
          <q-toolbar>
            <q-btn icon="settings" flat />
            <q-separator vertical/>
            <q-space/>
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
import { defineComponent, watch, ref, Ref } from 'vue'
import DiaryPage from 'src/pages/DiaryPage'
import MyWorkoutsPage from 'src/pages/MyWorkoutsPage'
import OverviewPage from 'src/pages/OverviewPage'
import { useRoute,RouteRecordName } from 'vue-router'


export default defineComponent({
  name: 'TabLayout',
  data() {
    return {
      //tabModel: 'overview',
      //test: false,
    }
  },

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
