<template>
  <q-item>

    <q-item-section>
      <q-item-label>
        {{ log.workout ? log.workout.name : '[error getting name]' }}
      </q-item-label>
    </q-item-section>
      <q-item-section>
      <q-item-label>
        {{ log.fromNow }}
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ $dayjs.duration(log.duration || 0).format('m[m]ss[s]') }}
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-btn @click="removeLog(log.$id)" icon="delete" />
    </q-item-section>
    <q-item-section>
      <q-btn @click="$router.push({ name: 'workout-log-details', params: { workoutLogId: log.$id || '' } })" icon="info" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WorkoutLogModel from 'src/store/models/WorkoutLogModel';

export default defineComponent({
  name:'WorkoutLogItemComponent',
  props: {
      log: {
          type: WorkoutLogModel,
          required: true,
      }
  },
  methods: {
    removeLog(id: string | null): void {
      WorkoutLogModel.delete(id || '')
        .then(() => {
          this.$q.notify('removed.')
        })
        .catch((err) => console.error(err))
    },
  },
});
</script>