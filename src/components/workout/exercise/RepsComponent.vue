<template>
  <div>
    <q-btn-group spread rounded>

        <q-btn :disable="disable || base < 3" color="orange" rounded v-on:click="(base--)">&lsaquo;</q-btn>
        <q-btn :disable="disable" color="amber" rounded @click="$emit('repResponse',input)" v-for="input in buttonList" :key="input">{{ input }}</q-btn>
        <q-btn :disable="disable" color="orange" rounded v-on:click="(base++)">&rsaquo;</q-btn>
    </q-btn-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    data(){
      return {
        //base: 8 as number,
        //buttonList: []
      }
    },
    props: {
      reps:Number,
      status:String,
      disable:Boolean
      //status:String,
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
    beforeMount() {

        //this.base = this.reps > 2 ? this.reps : 2
        
    },
    setup(props) {
      let base = 8
      if(props.reps) base = props.reps > 2 ? props.reps : 2
      return {
        base
      }
    }
    
})
</script>

<style>

</style>