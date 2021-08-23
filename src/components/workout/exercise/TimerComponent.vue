<template>
  <div>
    {{time}}
    <q-knob
      readonly
      v-model="timer.percentage"
      show-value
      size="90px"
      :thickness="0.1"
      color="orange"
      track-color="orange-3"
      class="text-orange q-ma-md"
    >
    {{ timer.countdownString }}
    </q-knob>
  </div>
</template>

<script lang="ts">
import Timer from './../../../classes/Timer'
import Time from '../../../classes/Time'
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
      //status:String,
    },
    beforeMount() {
      this.timer = new Timer
      this.timer.seconds = this.time?.seconds || 0
    },
    mounted() {
      this.$watch('active',(active:boolean) => {
        active ? void this.timer.run().then(() => {
          this.$emit('timeisup')
        }) : false
      })
    },
    beforeUnmount() {
      this.timer.stop()
    }
})
</script>

<style>

</style>