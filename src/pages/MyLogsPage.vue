<template>
  <q-page>
    <div class="text-h4">My Logs</div>
    <q-card>
      <q-list bordered>
        <workout-log-item v-for="(log) in myLogs" :key="log.$id" :log="log" />
      </q-list>
    </q-card>

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WorkoutLogModel from 'src/store/models/WorkoutLogModel'
//import LogEntry from 'src/components/my-logs/LogEntry.vue'
import  WorkoutLogItem from 'src/components/WorkoutLogItem.vue'
export default defineComponent({
  mounted() {
    //
  },
  computed: {
    myLogs() {
      //console.log(WorkoutModel.all())
      //return WorkoutLogModel.all()
      return WorkoutLogModel.query().withAllRecursive().all()
    },
  },
  components: {
    WorkoutLogItem
  }
})
</script>

<style lang="scss">
</style>