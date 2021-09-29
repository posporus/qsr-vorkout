<template>
  <q-item>
    <q-input dense :label="label" outlined v-model="value">
      <template v-slot:prepend>
        <q-btn  round flat @click="value--" icon="remove_circle" />
      </template>
      <template v-slot:append>
        <q-btn round flat @click="value++" icon="add_circle" />
      </template>
    </q-input>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputSpinnerComponent',
  data() {
    return {
      value: this.modelValue || 0,
    }
  },
  props: {
    modelValue: Number,
    label:String,
  },
  emits: ['update:modelValue'],

  mounted() {
    this.$watch('value', () => {
      this.$emit('update:modelValue', this.value)
    })
    this.$watch('modelValue', (val: number) => {
      this.value = val
    })
  },
})
</script>

<style></style>
