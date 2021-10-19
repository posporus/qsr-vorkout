<template>
<q-card></q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WorkoutLogModel from 'src/store/models/WorkoutLogModel';

export default defineComponent({
  name:'AvtivityOverTime',
  props: {
      log: {
          type: WorkoutLogModel,
          required: true,
      }
  },
  
});
</script>