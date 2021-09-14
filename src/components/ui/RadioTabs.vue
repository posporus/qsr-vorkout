<template>
  <q-item-section>
    <q-tabs
      dense
      v-model="model"
      :options="data"
      size="sm"
      class="text-white"
    >       
      <q-tab
        v-for="tab in data"
        :key="tab.name"
        :icon="tab.icon"
        :name="tab.name"
        :class="'bg-' + tab.color"
      />
    </q-tabs>

    <q-tab-panels
      v-model="model"
      animated
      transition-prev="fade"
      transition-next="fade"
    >
      <q-tab-panel
        v-for="tab in data"
        :key="tab.name"
        :name="tab.name"
        :class="'bg-' + tab.color"
      >
        <q-card>
          <q-item>
            <slot v-bind:tab="tab" />
          </q-item>
        </q-card>

      </q-tab-panel>
    </q-tab-panels>
  </q-item-section>
</template>

<script lang="ts">
//import Exercise from '../../classes/Exercise';
import { defineComponent } from 'vue';
//import { presets } from '../../classes/PresetController';
export class RadioTabData {
    label?:string
    name:string
    icon?:string
    color?:string
    constructor(){
        this.name=''
    }
}
export default defineComponent({
  data() {
    return {
        model:'',
        //tabs:this.data as RadioTabData
      //model: this.modelValue,
      //presets: presets,
    };
  },
  props: {
    //_exercise: Exercise,
    data:{
        type:Array,
        required:true
    },
  },
  
  //computed: {},
});
</script>

<style></style>
