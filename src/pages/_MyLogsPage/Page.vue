<template>
  <q-page>
    <q-card>
      <q-list bordered>
        <workout-log-item-component
          v-for="log in myLogs"
          :key="log.$id"
          :log="log"
        />
      </q-list>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WorkoutLogModel from 'src/store/models/WorkoutLogModel'
//import LogEntry from 'src/components/my-logs/LogEntry.vue'
import WorkoutLogItemComponent from './components/WorkoutLogItemComponent.vue'
export default defineComponent({
  name: 'MyLogsPage',
  computed: {
    myLogs() {
      return WorkoutLogModel.query().withAllRecursive().all()
    },
  },
  components: {
    WorkoutLogItemComponent,
  },
})
</script>

<style lang="scss"></style>
