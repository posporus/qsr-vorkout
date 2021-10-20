<template>
  <apexchart type="line" :options="options" :series="series"></apexchart>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { WorkoutLogModel } from 'src/store/models'
import dayjs, { Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)
import { ApexOptions } from 'apexcharts'
dayjs.extend(duration)
export interface WeekInterface {
  week: number
  year: number
}

export default defineComponent({

  name: 'AvtivityOverTimeChart',
 
  props: {
    weeksToShow: {
      type: Number,
      default: 8,
    },
  },

  setup(props) {

    
    const data: number[] = []
    const options: Ref<ApexOptions> = ref({})

    const labels: string[] = []

    for (let i = 0; i <= props.weeksToShow * 7; i++) {
      const time: Dayjs = dayjs().subtract(props.weeksToShow * 7 - i, 'days')

      data.push(
        +(
          (WorkoutLogModel.totalDurationOverTime(time, { days: 7 }) || 0) / 6e4 // /60000ms = 6e4
        ).toFixed(1)
      )

      labels.push(time.toDate().toString())
    }

    const series: { name: string; data: number[] }[] = [{
      name: 'peter',
      data: data,
    }]
    
    options.value = {
      stroke: {
        curve: 'smooth',
      },
      chart: {
        toolbar: {
          show: false,
        },
      },
      labels: labels,
      yaxis: {
        title: {
          text: 'min/7days',
        },
      },
      xaxis: {
        type: 'datetime',
      },
    }

    return {
      series,
      options,
    }
  },
})
</script>
