<template>
  <div class="reps self-center" :class="status">
    <q-btn-group spread rounded>
        <q-btn :disable="disable || base < 3" color="black" rounded v-on:click="(base--)" icon="arrow_left"></q-btn>
        <q-btn :disable="disable" color="black" rounded @click="$emit('repResponse',input)" v-for="input in buttonList" :key="input">{{ input }}</q-btn>
        <q-btn :disable="disable" color="black" rounded v-on:click="(base++)" icon="arrow_right"></q-btn>
    </q-btn-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    data(){
      return {
        base: 8 as number,
      }
    },
    props: {
      reps: {
        type: Number,
        required: true,
      },
      status:{
        type: String,
        default: 'inqueue',
      },
      disable: {
        type: Boolean,
        default: true,
      }
    },
    computed: {
        
        buttonList():Array<number> {
            const list:Array<number> = []
            for(let i=this.base - 2;i<this.base+3;i++) {
                list.push(i)
                console.log(i)
            }
            return list
        },        
    },
    mounted() {
      this.base = this.reps > 2 ? this.reps : 2
    },
    
})
</script>

<style lang="scss">
  .reps {
    transition: all 0.2s ease;
    transition-delay: .3s;
  }
  .reps.next {
    width: 90%;
    opacity: 0;
    transition-delay: 0s;
  }
  
  .reps.running {
    width: 100%;
    opacity: 1;
  }

</style>