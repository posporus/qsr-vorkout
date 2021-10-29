<template>
  <!--<q-item>
     <q-item-section>
      <q-item-label lines="1" class="text-body2"> Rest:Exercise </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-linear-progress
        :value="workoutLogDetail.restExerciseRatio"
        size="15px"
        rounded
        color="red"
        track-color="green"
        class="q-mt-sm"
      />
    </q-item-section>
  </q-item> -->
  <q-item>
    <q-item-section>
        Rest:Exercise Ratio
      <apexchart :options="options" :series="series" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { WorkoutLogModel } from 'src/store/models'
import { ApexOptions } from 'apexcharts'

export default defineComponent({
  name: 'RestExerciseRatio',
  props: {
    workoutLogDetail: {
      type: WorkoutLogModel,
      required: true,
    },
  },
  computed: {
    ratio(): number {
      //const ratio =
      return 1
    },
  },
  setup(props) {
    const ratio: Ref<number> = ref(props.workoutLogDetail.restExerciseRatio)
    const series:ApexNonAxisChartSeries = [ratio.value*100,(1-ratio.value)*100]
    console.log(series)
    const options: ApexOptions = {
      chart: {
        type: 'donut',
      },
      labels:['Exercise','Rest']
    }
    return {
      series,
      options,
    }
  },
})
</script>
