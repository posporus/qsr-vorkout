<template>
  <div class="g-footer full-width fixed-bottom no-padding bg-primary text-white shadow-3">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GFooter',
  
})
</script>
<style lang="scss" scoped>

.g-footer {
  background-color: grey;
    height: 50px;
    z-index: 4000;
}
</style>
