<template>
  <q-page>
    
    <q-markdown :src="changelog"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
//import changelog from '../../../README.md'

export default defineComponent({
  
  name: 'ChangeLogPage',
  /* 
  setup() {
    const chglg:string = changelog
    return {
      changelog:chglg
    }
  }, */
})
</script>

<style lang="scss"></style>
