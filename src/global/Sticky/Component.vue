<template>
  <div class="g-sticky absolute" :style="gStickyStyle">
    <slot/>
  </div>
</template>

<script lang="ts">
/**
 * 
 */
import { defineComponent,PropType } from 'vue'

export default defineComponent({
  name: 'GPage',
  props: {
    offset: {
      type: Object as PropType<[number,number]>,
      required:true,
    },
    position: {
      type: String as PropType<'top-right'|'top-left'|'bottom-right'|'bottom-left'>,
      default: '',
    },
  },
  
  computed: {
    gStickyStyle():string {
      const position = this.position.split('-')
      const style = `
        ${position[0]}:${this.offset[0]}px;
        ${position[1]}:${this.offset[1]}px;
        `
        console.log(style)
      return style
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
