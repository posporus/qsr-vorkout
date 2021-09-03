<template>
  <div
    class="exercise column items-center justify-evenly"
    :class="status + ' bg-' + exercise.preset.color"
  >
    <div class="col">
      <title-component
        :status="status"
        :title="exercise.preset.defaultName || exercise.name"
				:icon="exercise.preset.icon"
      />
    </div>

    <div class="col-auto">
      <timer-component
        v-if="exercise.hasTimer"
        :time="exercise.time"
        :active="timerActive"
        :key="exercise.id"
        @timeisup="whenTimeisup"
        :status="status"
      />
    </div>

    <div class="col column">
      <reps-component
        v-if="exercise.hasReps"
        :reps="exercise.reps"
        :disable="
          status === 'inqueue' ||
          status === 'next' ||
          (exercise.hasTimer && !timeisup)
        "
        @repResponse="
          (reps) => {
            whenRepResponse(reps);
          }
        "
        :status="status"
      />
    </div>
		<next-label :status="status"/>
		<background-component :icon="exercise.preset.icon" :color="exercise.preset.color" />
  </div>
</template>

<script lang="ts">
//type Status = 'inqueue' | 'next' | 'running' | 'past'
import TitleComponent from './exercise/TitleComponent.vue';
import RepsComponent from './exercise/RepsComponent.vue';
import TimerComponent from './exercise/TimerComponent.vue';
import NextLabel from './exercise/NextLabel.vue'
import BackgroundComponent from './exercise/Background.vue'
import { ExerciseStatus } from '../../classes/ExerciseStatus';
//import { Status } from '../../classes/ExerciseStatus'
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      //status: 'inqueue' as Status
      timeisup: false,
      //repResponse: false
    };
  },

  props: {
    exercise: {
      type: ExerciseStatus,
      required: true,
    },
    status: String,
    timerActive: Boolean,
  },

  components: {
    TimerComponent,
    RepsComponent,
    TitleComponent,
		NextLabel,
		BackgroundComponent,
  },
  methods: {
    whenTimeisup() {
      this.timeisup = true;
      this.next();
      //else
      if (!this.exercise?.hasReps) {
        this.focusActive();
      }
    },
    whenRepResponse(reps: number) {
      console.log('whenRepResponse Exercise', reps);
      //this.repResponse = true
      this.$emit('repResponse', reps);
      if (!this.exercise?.hasTimer) {
        this.next();
      }
      this.focusActive();
    },
    next() {
      this.$emit('next');
    },
    focusActive() {
      this.$emit('focusActive');
    },
  },
});
</script>

<style lang="scss">
.exercise {
	z-index: 1;
  position: absolute;
  //display: inline-block;
  padding: 20px;
  width: 100%;
  transition: all 0.5s;
	border-bottom: 5px solid black;
}
.exercise.inqueue {
  height: 30vh;
  top: 100vh;
}

.exercise.running {
  height: 70vh;
  top: 0vh;
}
.exercise.next {
  top: 70vh;
  height: 30vh;
}
.exercise.past {
  height: 0vh;
  top: 0vh;
}
</style>
