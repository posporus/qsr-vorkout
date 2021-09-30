<template>
  <q-item>
    <q-input dense label="Time" mask="##:##" outlined v-model="timeString">
      <template v-slot:prepend>
        <q-btn  round flat @click="seconds--" icon="remove_circle" />
      </template>
      <template v-slot:append>
        <q-btn round flat @click="seconds++" icon="add_circle" />
      </template>
    </q-input>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TimeInputComponent',
  data() {
    return {
      seconds: this.modelValue || 0,
    }
  },
  props: {
    modelValue: Number,
  },
  emits: ['update:modelValue'],

  mounted() {
    this.$watch('seconds', () => {
      this.$emit('update:modelValue', this.seconds)
    })
    this.$watch('modelValue', (val: number) => {
      this.seconds = val
    })
  },
  computed: {
    timeString: {
      get: function () {
        const m: number = Math.floor(this.seconds / 60)
        const s: number = this.seconds - m * 60
        const mm: string = m < 10 ? '0' + m.toString() : m.toString()
        const ss: string = s < 10 ? '0' + s.toString() : s.toString()
        const string = mm + ':' + ss
        return string
      },
      set: function (timeString: string) {
        const timeParts = timeString.split(':')
        const seconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1])
        this.seconds = seconds
      },
    },
  },
})
</script>

<style></style>
