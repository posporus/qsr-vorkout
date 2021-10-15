<template>
  <div class="q-pa-md">
    <q-select
      label="Categories"
      filled
      v-model="model"
      use-input
      multiple
      input-debounce="0"
      @new-value="createCategory"
      :options="filterOptions"
      @filter="filterFn"
      style="width: 250px"
      @input-value="
        (val) => {
          inputValue = val
        }
      "
      ref="catSelect"
    >
      <template v-slot:selected-item="scope">
        <q-chip
          removable
          dense
          @remove="scope.removeAtIndex(scope.index)"
          :tabindex="scope.tabindex"
          :color="scope.opt.color"
          text-color="black"
        >
          {{ scope.opt.label }}
        </q-chip>
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-avatar :color="scope.opt.color">
              {{ scope.opt.label.substring(0, 2).toUpperCase() }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox
              :model-value="scope.selected"
              @update:model-value="scope.toggleOption(scope.opt)"
            />
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:append>
        <q-btn
          v-if="inputValue && !categoryOption"
          round
          dense
          flat
          icon="add"
          @click="createCategory"
        />
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, PropType } from 'vue'
import { CategoryModel } from 'src/store/models'
import { Collections, Item } from '@vuex-orm/core'
import { randomColor } from 'src/utility'

import { CategoryOptionInterface } from 'src/types'
import { QSelect } from 'quasar'

export default defineComponent({
  name: 'CategorySelectComponent',
  data() {
    return {
      inputValue: '',
      model: [] as CategoryOptionInterface[],
      category_ids: this.modelValue || 0,
      value: '',
    }
  },
  props: {
    modelValue: Array as PropType<CategoryOptionInterface[]>,
  },
  emits: ['update:modelValue'],
  computed: {
    /* stringOptions: {
      get(): string[] {
        return this.stringTest
      },
      set(val: string[]) {
        this.stringTest = val
      },
    }, */
    stringOptions(): CategoryOptionInterface[] {
      return CategoryModel.all().map((item: Item<CategoryModel>) => {
        return {
          label: item?.name || '',
          value: item?.$id || '',
          color: item?.color || '',
        }
      })
    },
    /**
     * weather category exists or not
     */
    categoryOption(): CategoryOptionInterface | undefined {
      return this.stringOptions.find((item) => item.label === this.inputValue)
    },
  },
  methods: {
    createCategory() //val: string
    /* ,
      done: (arg1: CategoryOptionInterface, arg2: string) => void */
    {
      const val = this.inputValue
      console.log('createCategory', val)
      if (val.length > 0) {
        if (!this.categoryOption) {
          //this.stringOptions.push(val)
          CategoryModel.insert({
            data: {
              name: val,
              color: randomColor(13),
            },
          })
            .then((entities: Collections) => {
              const category = entities.categories[0] as CategoryModel
              console.log('e:', category.name)

              this.done({
                label: category.name || '',
                value: category.$id || '',
                color: category.color || '',
              })
            })
            .catch((err) => console.log(err))
        } else {
          this.catSelect?.toggleOption(this.categoryOption)
          this.catSelect?.updateInputValue('')
        }
        //done(val, 'toggle')
      }
    },
    filterFn(val: string, update: (arg1: () => void) => void) {
      console.log('filterFn', val, update)
      update(() => {
        if (val === '') {
          this.filterOptions = this.stringOptions
        } else {
          const needle = val.toLowerCase()
          this.filterOptions = this.stringOptions.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    done(option: CategoryOptionInterface) {
      console.log('done!')
      this.catSelect?.add(option)
      this.catSelect?.updateInputValue('')
    },
  },
  mounted() {
    this.filterOptions = this.stringOptions
    this.$watch('model', () => {
      console.log('model:', this.model)
      this.$emit('update:modelValue', this.model)
    })
    /* this.$watch('category_ids', () => {
      this.$emit('update:modelValue', this.category_ids)
    }) */
    this.$watch('modelValue', (val: CategoryOptionInterface[]) => {
      this.model = val
    })
  },
  setup() {
    const filterOptions: Ref<CategoryOptionInterface[]> = ref([])
    const catSelect = ref<InstanceType<typeof QSelect>>()
    return {
      filterOptions,
      catSelect,
    }
  },
})
</script>

<style></style>
