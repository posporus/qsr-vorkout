<template>
  <q-btn-dropdown dense flat icon="sort">
    <q-list>
      <q-item dense>
        <q-item-section>
          <q-item-label caption>Sort by</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />

      <q-item
        v-for="item in items"
        :key="item.condition"
        clickable
        v-close-popup
        @click="sort(item.condition)"
      >
        <q-item-section>
          <q-item-label>
            {{ item.label }}
            <q-icon v-if="item.condition === condition" :name="asc[item.condition] ? 'arrow_drop_down':'arrow_drop_up'" />
          </q-item-label>
        </q-item-section>
      </q-item>
    
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface SortButtonValue {
  condition: string
  asc: boolean
}

export interface SortButtonItem {
  label: string
  condition: string
  asc?: boolean
}
export type SortButtonItems = Array<SortButtonItem>

export default defineComponent({
  name: 'SortByButton',
  data() {
    return {
      condition: '',
      asc: {} as { [key: string]: boolean },
    }
  },
  props: {
    modelValue: {
      type: Object as PropType<SortButtonValue>,
      required: true,
    },
    items: {
      type: Object as PropType<SortButtonItems>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  mounted() {
      //Init
    this.condition = this.modelValue.condition
    this.items.forEach((item: SortButtonItem) => {
      this.asc[item.condition] = true
    })
    console.log(this.asc)
    this.$watch('condition', () => {
        this.updateModel()
    })
    this.$watch('asc', () => {
        this.updateModel()
    },{deep:true})
  },
  methods: {
    sort(condition:string) {
        console.log('sort',condition,this.condition)
        if(this.condition === condition) this.asc[condition] = !this.asc[condition]
        else this.condition = condition
    },
    updateModel() {
        console.log('updateModel',this.asc)
        this.$emit('update:modelValue', {
        condition: this.condition,
        asc: this.asc[this.condition],
      })
    }
  },
})
</script>

<style lang="scss">
  .common-jjjj {
    display: block;;
  }
</style>
