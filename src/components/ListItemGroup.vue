<template>
  <div v-for="group in groupedItems" :key="group">
    <!-- <slot name="header" :groupLabel="group[0].dateString"> </slot> -->
    <slot :groupedItems="group"> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
/**
 * item_group = {
 *  group1: [
 *    item1,
 *    item2,
 *    ... 
 *  ],
 *  ...
 * }
 */

export interface ItemGroups {
  [key: string]: Item[]
}

export interface Item {
  [key: string]: unknown
}

export default defineComponent({
  name: 'ListItemGroup',
  data() {
    return {
      //groupedItems: {} as ItemGroups,
    }
  },
  props: {
    items: {
      type: Array as PropType<Array<Item>>,
      requred: true,
    },
    groupBy: {
      type: String,
      required: true,
    },
  },
  mounted() {
    /* this.items?.forEach((item: Item) => {
      if (item.hasOwnProperty('id')) console.log(item['id'])
    }) */

    //console.log(this.groups)
  },
  computed: {
    groupedItems(): ItemGroups {
      const groupedItems: ItemGroups = {}
      this.groups.forEach((groupName:string) => {
        const groupy:Item[] = this.items?.filter((item:Item) => {
          console.log(groupName,item)
          return item[this.groupBy] === groupName
        }) || []
        console.log(groupy)
        groupedItems[groupName] = groupy
      })
      
      /* this.items?.forEach((item) => {
        group['/j4jj/d'].push(item)
      }) */

      return groupedItems
    },
    //TODO: check if this is good or not
    groups(): Array<string> {
      console.log(this.groupBy)
      const groups: string[] = []
      this.items?.forEach((item: Item) => {
        if (this.groupBy in item) {
          const itemProp: string = item[this.groupBy] as string //good?

          if (!groups.find((group) => group === itemProp)) {
            groups.push(itemProp.toString())
          }
        }
        
      })
      console.log('groups return',groups)
      return groups
    },
  },
})
</script>

<style lang="scss"></style>
