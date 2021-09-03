<template>
  <q-page padding class="edit-page">
    is new: {{ isNew }} id: {{ id }}
    <q-form>
      <q-list bordered class="rounded-borders edit-box">
        <q-item bordered>
          <q-item-section>
            <q-input
              dense
              label="Name your workout"
              v-model="workout.name"
            ></q-input>
          </q-item-section>
        </q-item>
        <edit-set
          v-for="(set, index) in workout.sets"
          :workout="workout"
          :_set="set"
          :key="index"
        />
        <q-item>
          <q-btn icon="add" v-on:click="addSet">add set</q-btn>
        </q-item>
      </q-list>
    </q-form>
    <q-btn @click="save"> save </q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Workout from 'src/classes/Workout';
import EditSet from 'src/components/edit-workout/EditSet.vue';
import WorkoutModel from 'src/store/models/WorkoutModel'
import { useQuasar } from 'quasar';

export default defineComponent({
  data() {
    return {
      workout: {} as Workout,
    };
  },
  props: {
    id: {
      type: String,
      default: 'new',
    },
  },
  components: {
    EditSet,
  },
  beforeMount() {
    this.workout = new Workout();
    console.log('created workout!', this.workout);
  },
  mounted() {
    console.log('mounted!', this.workout);

    if (!this.isNew) {
      const workout = WorkoutModel.find(this.id);
      if (workout) {
        this.workout.importWorkout({
          id: this.id,
          name: workout.name,
          sets: workout.sets,
        });
      }
    }
  },
  computed: {
    isNew() {
      if (this.id === 'new' || typeof this.id === undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    save() {
      let id = null;
      if (!this.isNew) {
        id = this.id;
      }
      const exported = this.workout.exportWorkout();
      WorkoutModel.insert({
        data: {
          id: id,
          name: exported.name,
          sets: exported.sets,
        },
      })
        .then((data) => {
          void this.$router.push({
            name: 'edit', params: { id: data.workouts[0].$id || '' }
          })
          this.showNotification('Workout Saved.');
          console.log('after insert', data);
        })
        .catch((err) => console.error(err));
    },
    addSet() {
      this.workout.addSet();
    },
  },
  setup() {
    const $q = useQuasar();
    return {
      showNotification(notification: string) {
        $q.notify(notification);
      },
    };
  },
});
</script>

<style lang="scss">
.edit-page {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
}
.edit-box {
  background: rgba(255, 255, 255, 0.7);
}
</style>
