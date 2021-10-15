<template>
  <q-btn-dropdown dense flat icon="filter_list" :color="selected.length > 0 ? 'red' : 'white'">
    <q-list>
      <slot name="prepend">
        
      </slot>
      <q-item dense>
        <q-item-section>
          <q-item-label caption>{{ filterTitle }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <!-- #ITEM -->

      <q-item
        v-for="option in shownOptions"
        :key="option.value"
        clickable
        v-close-popup
      >
        <q-item-section>
          <q-item-label>
            {{ option.label }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-checkbox v-model="option.selected" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface FilterButtonOption {
  label: string
  value: string
  selected: boolean
}
export type FilterButtonOptions = Array<FilterButtonOption>

export default defineComponent({
  name: 'SortByButton',
  data() {
    return {
      selected: [] as FilterButtonOptions,
      shownOptions: [] as FilterButtonOptions,
    }
  },
  props: {
    modelValue: {
      type: Object as PropType<FilterButtonOptions>,
      required: true,
    },
    options: {
      type: Object as PropType<FilterButtonOptions>,
      required: true,
    },
    filterTitle: {
      type: String,
      default: 'Filter'
    }
  },
  emits: ['update:modelValue'],
  mounted() {
    this.shownOptions = this.options
    this.selected = this.modelValue

    /* this.items.forEach((item: SortButtonItem) => {
      this.asc[item.condition] = true
    }) */
    this.$watch(
      'shownOptions',
      (options: FilterButtonOptions) => {
        const selected = options.filter(
          (option: FilterButtonOption) => option.selected
        )
        this.$emit('update:modelValue', selected)
      },
      { deep: true }
    )
    this.$watch(
      'modelValue',
      (selected: FilterButtonOptions) => {
        this.selected = selected
      },
      { deep: true }
    )
  },
})
</script>

<style lang="scss">
.common-jjjj {
  display: block;
}
</style>
