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
import { nanoid } from 'nanoid'

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
    /**
     * create new workout
     */
    this.workout = new Workout();
    console.log('created workout!', this.workout);
  },
  mounted() {
    console.log('mounted!', this.workout);

    /**
     * when the workout already exists, load its data from Vuex ORM
     * and import it to the workout object
     */
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
    /**
     * determines weather its a new workout or an existing one
     */
    isNew() {
      if (this.id === 'new' || typeof this.id === undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    /**
     * saves the workout to Vuex ORM
     */
    save() {
      let id = null
      /**
       * uses weather the old id for updating
       * or generates a new one.
       */
      if (!this.isNew) id = this.id
      else id = nanoid()

      /**
       * export workout data in Neat Format
       */

      const exported = this.workout.exportWorkout();

      /**
       * put it to the database
       */
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

    /**
     * add a new set to the workout
     */
    addSet() {
      this.workout.addSet();
    },

  },
  setup() {
    /**
     * setup notification toast
     */
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
