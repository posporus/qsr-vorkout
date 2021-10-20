<template>

      <apexchart :options="options" :series="series" height="120"/>
     
</template>

<script lang="ts">
import { ApexOptions } from 'apexcharts'
import dayjs, { Dayjs } from 'dayjs'
import { WorkoutLogModel } from 'src/store/models'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DaysActivityOverview',
 
  props: {
    daysToShow: {
      type: Number,
      default: 7,
    },
  },
 
  setup(props) {
    const days: { day: string; minutes: number }[] = []

    for (let i = props.daysToShow - 1; i >= 0; i--) {
      const day: Dayjs = dayjs().subtract(i, 'days')
      days.push({
        day: day.format('dd'),
        minutes: +(
          WorkoutLogModel.totalDurationOverTime(day, {
            days: 1,
          }) / 6e4
        ).toFixed(1),
      })
    }
    /**
     * Apexchart options
     */
    const options: ApexOptions = {
      chart: {
        //height: 120,
        type: 'bar',
        toolbar:{
          show:false
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      grid: {
          show: false
      },
      labels: days.map((day) => day.day),
    }

    /**
     * Apexchart data
     */
    const data: number[] = days.map((day) => day.minutes)

    const series: ApexAxisChartSeries = [
      {
        name: 'Minuteds/Day',
        data: data,
      },
    ]

    return {
      options,
      series,
    }
  },
})
</script>

<style lang="scss" scoped></style>
