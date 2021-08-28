<template>
  <div class="exercise" :class="status">
      <div class="exercise-center-box content-center">
        
          {{ exercise.name }}
          {{ exercise.repResponse }}
        
        
        <timer-component
            v-if="exercise.hasTimer"
            :time="exercise.time"
            :active="timerActive"
            :key="exercise.id"
            @timeisup="whenTimeisup" />
        <reps-component
            v-if="exercise.hasReps"
            :reps="exercise.reps"
            :disable="status === 'inqueue' || status === 'next' || (exercise.hasTimer && !timeisup)"
            @repResponse="(reps) => {whenRepResponse(reps)}"/>
      </div>
     
  </div>
</template>

<script lang="ts">
//type Status = 'inqueue' | 'next' | 'running' | 'past'
import RepsComponent from './exercise/RepsComponent.vue'
import TimerComponent from './exercise/TimerComponent.vue'
import { ExerciseStatus } from './../../classes/ExerciseStatus'
//import { Status } from '../../classes/ExerciseStatus'
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            //status: 'inqueue' as Status
            timeisup: false,
            //repResponse: false
        }
    },
    
    props: {
        exercise: {
            type: ExerciseStatus,
            required: true
        },
        status:String,
        timerActive:Boolean,
    },
    
    components: {
        TimerComponent,
        RepsComponent,
    },
    methods: {
        whenTimeisup() {

            this.timeisup = true
            this.next()
            //else
            if(!this.exercise?.hasReps) {
                this.focusActive()
            }
            
        },
        whenRepResponse(reps:number) {
            console.log('whenRepResponse Exercise',reps)
            //this.repResponse = true
            this.$emit('repResponse',reps)
            if(!this.exercise?.hasTimer) {
                this.next()
                
            }
            this.focusActive()
            
        },
        next() {
            this.$emit('next')
        },
        focusActive() {
            this.$emit('focusActive')
        }
    }
})
</script>

<style lang="scss">

.exercise {
    position:absolute;
    display: inline-block;
    
    width: 100%;
    transition: all .5s;
    
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
    top:70vh;
    height:30vh;
}
.exercise.past {
    height: 0vh;
    top:-100vh;
}

.exercise-center-box {
    display: flexbox;
    justify-self: center;
    align-items: center;
}

</style>