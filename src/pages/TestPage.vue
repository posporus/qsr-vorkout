<template>
  <q-page padding>
    <!-- content -->
    
    <q-card>
      <q-list bordered>
        <exercise-log-item v-for="(log) in logs" :key="log.$id" :exercise-log="log" />
      </q-list>
    </q-card>
    
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {ExerciseLogModel} from 'src/store/models'
import ExerciseLogItem from 'components/ExerciseLogItem.vue'
export default defineComponent({
  data() {
    return {
      name: '',
    };
  },
  components: {
    ExerciseLogItem
  },
    
  computed: {

    logs(): Array<ExerciseLogModel> {
      return ExerciseLogModel.query().orderBy('started', 'asc').get();
    },
  },
  // name: 'PageName',
});
</script>
