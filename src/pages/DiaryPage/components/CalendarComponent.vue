<template>
  <q-btn dense flat icon="event">
    <q-popup-proxy
      ref="qDateProxy"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-date v-model="date" :events="events">
        <div class="row items-center justify-end">
          <q-btn v-close-popup label="Close" color="primary" flat />
        </div>
      </q-date>
    </q-popup-proxy>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { WorkoutLogModel } from 'src/store/models'
import { Item } from '@vuex-orm/core'

export default defineComponent({
  name: 'CalendarComponent',

  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  mounted() {
    this.$watch('date', (date: string) =>
      this.$emit('update:modelValue', date || '')
    )
    this.$watch('modelValue', (modelValue: string) => (this.date = modelValue))
  },
  computed: {
    events(): Array<string | undefined> {
      const workoutLogs = WorkoutLogModel.all()
      return workoutLogs.map((log: Item<WorkoutLogModel>) => log?.dateString)
    },
  },
  setup(props) {
    const date: Ref<string> = ref(props.modelValue)
    return {
      date,
    }
  },
})
</script>

<style lang="scss"></style>
