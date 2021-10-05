<template>
  <div>
    <q-circular-progress
      show-value
      font-size="40px"
      :value="timer.percentage"
      size="20vh"
      :thickness="1"
      color="grey-4"
      track-color="white"
      class="q-ma-md clock"
      :class="status"
    >
      {{ timer.countdownString }}
    </q-circular-progress>
  </div>
</template>

<script lang="ts">
import Timer from 'src/classes/Timer'
import Time from 'src/classes/Time'
import { useSound } from '@vueuse/sound'
import beep1 from 'src/assets/sounds/beep1.wav'
import beep2 from 'src/assets/sounds/beep2.wav'
import { getSetting } from 'src/utility'

import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      timer: {} as Timer,
    }
  },
  props: {
    time: Time,
    active: Boolean,
    status: {
      type: String,
      default: 'inqueue',
    },
  },

  mounted() {
    this.timer = new Timer()
    this.timer.seconds = this.time?.seconds || 0

    this.run(this.active)

    if (getSetting('workout/countdownSound')) {
      this.$watch('timer.countdown', (countdown: number) => {
        if (countdown === 0) {
          this.sound2.play()
        } else if (countdown <= 3) {
          this.sound1.play()
        }
      })
    }

    this.$watch('active', (active: boolean) => {
      this.run(active)
    })
  },
  beforeUnmount() {
    this.timer.stop()
  },
  methods: {
    run(active: boolean) {
      active
        ? void this.timer.run().then(() => {
            this.$emit('timeisup')
          })
        : false
    },
  },
  setup() {
    const sound1 = useSound(beep1)
    const sound2 = useSound(beep2)

    return {
      sound1,
      sound2,
    }
  },
})
</script>
<style lang="scss" scoped>
.clock {
  transition: all 0.3s;
  transition-delay: 0.2s;
}
.inqueue,
.next {
  opacity: 0;
}
.running {
  opacity: 1;
}
</style>
