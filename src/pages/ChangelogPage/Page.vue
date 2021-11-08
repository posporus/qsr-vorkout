<template>
  <g-page hideHeader>
    <q-card>
      <q-card-section v-html="parse"/>
    </q-card>
  
  </g-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import changelog from '../../../CHANGELOG.md'
import {Marked,Renderer} from '@ts-stack/markdown'

Marked.setOptions
({
  renderer: new Renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

export default defineComponent({
  
  name: 'ChangelogPage',
  computed: {
    parse():string {
      //console.log(this.changelog)
      return Marked.parse(this.changelog)
    }
  },
  
  setup() {
    const chglg:string = changelog
    return {
      changelog:chglg

    }
  },
})
</script>

<style lang="scss" scoped>
.q-card {
  font-family: monospace;
}
</style>
