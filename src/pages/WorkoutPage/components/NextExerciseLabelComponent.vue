<template>
  <div class="next-exercise-label" :class="status">
    next
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name:'NextExerciseLabelComponent',
  props: {
    status: {
      type: String,
      default: 'inqueue',
    },
  },
});
</script>

<style lang="scss">
.next-exercise-label {
	position: absolute;
	top:0px;
	font-weight: 700;
	text-transform: uppercase;
	background-color: black;
	color: white;
	padding: 1px 7px 2px 7px;
	border-radius: 0px 0px 10px 0px;
    transition: all .3s ease;
    transition-delay: .25s;
    //opacity: 0;
}
.next-exercise-label.running {
    //opacity: 0;
    left:-100px;
}
.next-exercise-label.next {
    //opacity: 1;
    left:0px;
}
.next-exercise-label.past {
    //opacity: 0;
    left:-100px;
}
</style>
