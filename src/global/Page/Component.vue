<template>
  <div class="g-page fit absolute-top bg-white">
    <div class="header fixed-top full-width no-margin bg-primary text-white shadow-3" v-if="!hideHeader">
      <slot name="header">
        <q-toolbar>
          <slot name="prepend-title" />
          <q-toolbar-title class="absolute-center">
            {{ title.toUpperCase() }}
          </q-toolbar-title>
          <slot name="append-title" />
        </q-toolbar>
      </slot>
    </div>
    <div class="q-pt-none q-pa-md q-gutter-md freeFooter content" :class="{'freeHeader':!hideHeader}">
      <slot name="default" />
    </div>
  </div>
</template>

<script lang="ts">
/**
 *
 */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GPage',
  props: {
    hideHeader: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },

  /* setup(props) {
    const hideHeader:Ref<boolean> = ref(props.hideHeader || false)
    const title:Ref<string> = ref('')

    return {
      hideHeader,
      title
    }
  } */
})
</script>
<style lang="scss" scoped>
.g-page {
  //padding-bottom: 50px;
  margin-left: 0px;
  .header {
    background-color: grey;
    height: 50px;
    z-index: 5000;
  }

  /* .content {
    
  } */
  .freeHeader {
    margin-top: 50px - 16px;
  }
  .freeFooter {
    padding-bottom: 50px + 16px;
  }

  
}
</style>
