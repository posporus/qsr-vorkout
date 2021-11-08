<template>
    <q-item clickable @click="$router.push({name:item.to})">
        <q-item-section avatar>
        <q-icon :name="item.icon"/>
        </q-item-section>
        <q-item-section>
        <q-item-label>
            {{item.label}}
        </q-item-label>
        </q-item-section>
    </q-item>
</template>

<script lang="ts">
import { defineComponent,PropType } from 'vue'
import {DotMenuItem} from 'src/types'

export default defineComponent({
  name: 'MenuItem',
  props: {
      item: {
          type:Object as PropType<DotMenuItem>,
          required:true
      }
  }
})
</script>
