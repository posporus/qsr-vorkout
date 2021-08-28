<template>
  <div class="exercise-background">
    <q-icon :name="icon"></q-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
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
.exercise-background {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 80vh;
    //background-color: tomato;
    opacity: 0.1;
    //top:-20vh;
    margin-top: -30vh;
    transition: all 1s ease;
}
.exercise-background.running {
    margin-left: 0vw;
    opacity: 0.1;
}
.exercise-background.inqueue {
    margin-left: 30vw;
    opacity: 0;
}
.exercise-background.next {
    opacity: 0.1;
    margin-left: 10vw ;
}

</style>
