<template>
  <q-item>

    <q-item-section>
      <q-item-label>
        {{ log.workout ? log.workout.name : '[error getting name]' }}
      </q-item-label>
    </q-item-section>
      <q-item-section>
      <q-item-label>
        {{ timeAgo }}
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ duration }}
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
import moment from 'moment';

export default defineComponent({
  name:'WorkoutLogItemComponent',
  props: {
      log: {
          type: WorkoutLogModel,
          required: true,
      }
  },
  computed: {
    
    timeAgo():string {
        return moment(this.log.ended || this.log.started).fromNow()
    },
    duration():string {
        if(this.log.ended) {
            const started = moment(this.log.started)
            const ended = moment(this.log.ended)
            
            const diff = ended.diff(started)
            const duration = moment.duration(diff,'milliseconds')
            
            return duration.humanize()

        }
        else {
            return 'running'
        }
    }
  },
  methods: {
    removeLog(id: string | null): void {
      WorkoutLogModel.delete(id || '')
        .then(() => {
          //notification
        })
        .catch((err) => console.error(err))
    },
  },
});
</script>