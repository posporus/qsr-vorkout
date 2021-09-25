<template>
  <div class="exercise-title" :class="status">
    {{ title }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name:'WorkoutTitleComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'inqueue',
    },
		icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.exercise-title {
  text-transform: uppercase;
  font-weight: 900;
	//width: auto;
	padding: 5px;
	transition: all 0.3s ease;
}
.exercise-title.next {
	font-size: 3vw;
	text-align: start;
}
.exercise-title.running {
	font-size: 7vw;
	text-align: center;
}
.exercise-title.past {
	font-size: 7vw;
	text-align: center;
}
</style>
