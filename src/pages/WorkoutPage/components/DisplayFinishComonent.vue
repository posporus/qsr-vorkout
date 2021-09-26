<template>
  <div class="finish-container">
    <q-card class="finish-pop" :class="finished ? 'show' : 'hide'">
      <q-card-section class="finish-message">FINISHED!</q-card-section>
      <q-card-section>
          duration:
        {{ workoutLogDetail?.duration }},
        {{ workoutLogDetail?.exerciseCount}}
        exercises
      </q-card-section>
      <q-card-actions class="justify-center">
      <q-btn
      class="bg-red"
        @click="
          $router.push({
            name: 'workout-log-details',
            params: { workoutLogId: workoutLogId || '' },
          })
        "
        icon="info"
        >Show Stats</q-btn
      >
      </q-card-actions>
    </q-card>
  </div>
  <!--
      not supergood solution to show the background with if statement
  -->
  <background-component
  v-if="finished"
  style="z-index:-999"
  icon="sports_score"
  />
</template>

<script lang="ts">
import { WorkoutLogModel } from 'src/store/models'
import { defineComponent } from 'vue'
import BackgroundComponent from 'components/BackgroundComponent.vue'
import { Item } from '@vuex-orm/core'
export default defineComponent({
  name: 'DisplayFinishComponent',
  props: {
    finished: {
      type: Boolean,
    },
    workoutLogId: {
      type: String,
      required: true,
    },
  },
  components: {
      BackgroundComponent
  },
  computed: {
    workoutLogDetail(): Item<WorkoutLogModel> {
      const workoutLog = WorkoutLogModel.query()
        .whereId(this.workoutLogId)
        .withAllRecursive(1)
        .first()
      return workoutLog
    },
  },
})
</script>

<style lang="scss">
.finish-container {
  position: absolute;
  width: 100%;
  height: 100%;
  //background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
}
.finish-container .finish-pop {
  padding: 5%;
  border: 5px solid black;
  border-radius: 30px;
  background-color: white;
  text-align: center;
  transition: all 0.3s;
  transition-delay: 0.2s;
}
.finish-message {
  font-size: 7vh;
  font-weight: 900;
}
.hide {
  transform: scale(0.9);
  opacity: 0;
  filter: blur(3px);
}
.show {
  transform: scale(1);
  opacity: 1;
  filter: blur(0px);
}
</style>
