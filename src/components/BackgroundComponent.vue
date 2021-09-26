<template>
  <div class="exercise-background" :class="'bg-'+color">
    <q-icon class="background-icon" :name="icon"></q-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name:'BackgroundComponent',
  props: {
    status: {
      type: String,
      default: 'inqueue',
    },
    icon: {
      type: String,
      required:true,
    },
    color: {
      type: String,
      required:true,
    },
  },
});
</script>

<style lang="scss">
.background-icon {
  opacity: 0.1;
  margin-top:-30vh;
}
.exercise-background {
    //z-index: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 80vh;
    //overflow: hidden;
    //background-color: tomato;
    //opacity: 0.1;
    //top:-20vh;
    //padding-bottom: 40vh;
    //transition: all 0.5s;
    //transition-delay: 200ms;
}

</style>
