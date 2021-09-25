<template>
  <div>

    <q-circular-progress
      show-value
      font-size="40px"
      :value="timer.percentage"
      :size="status === 'running' ? '20vh' : '10vh'"
      :thickness="1"
      color="grey-4"
      track-color="white"
      class="q-ma-md"
    >
      {{ timer.countdownString }}
    </q-circular-progress>

  </div>
</template>

<script lang="ts">
import Timer from 'src/classes/Timer'
import Time from 'src/classes/Time'

import { defineComponent } from 'vue'
export default defineComponent({
    data(){
      return {
        timer:{} as Timer
      }
    },
    props: {
      time:Time,
      active:Boolean,
      status:{
        type:String,
        default: 'inqueue'
      }
    },
   
    mounted() {

      this.timer = new Timer
      this.timer.seconds = this.time?.seconds || 0

      this.run(this.active)

      this.$watch('active',(active:boolean) => {
        this.run(active)
      })
    },
    beforeUnmount() {
      this.timer.stop()
    },
    methods: {
      run(active:boolean) {
        active ? void this.timer.run().then(() => {
          this.$emit('timeisup')
        }) : false
      }
    }
})
</script>