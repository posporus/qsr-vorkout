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
import Timer from './../../../classes/Timer'
import Time from '../../../classes/Time'
//import { Status } from '../../../classes/ExerciseStatus'
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
      //status:String,
    },
   
    mounted() {

      this.timer = new Timer
      this.timer.seconds = this.time?.seconds || 0

      this.run(this.active)

      this.$watch('active',(active:boolean) => {
        console.log('watch timer ', active)
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

<style>

</style>