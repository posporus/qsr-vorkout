<template>
  <g-page title="Diary">
    <template #header>
      <q-toolbar>
        <calendar-component v-model="date" />
        
        <q-space />
        <q-toolbar-title>Diary</q-toolbar-title>
        <q-space />
        

        <sort-by-button
          :items="[
            {
              label: 'Date',
              condition: 'started',
            },
            {
              label: 'Duration',
              condition: 'duration',
            },
          ]"
          v-model="sortBy"
        />
      </q-toolbar>
    </template>


    <workout-logs-list :sort-by="sortBy" :day="date" />
  </g-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import CalendarComponent from './components/CalendarComponent.vue'
//import moment from 'moment'
import WorkoutLogsList from 'src/components/WorkoutLogsList.vue'
import SortByButton from 'components/SortByButton.vue'

export default defineComponent({
  components: { CalendarComponent, WorkoutLogsList, SortByButton },
  name: 'DiaryPage',
  data() {
    return {
      sortBy: {
        condition: 'started',
        asc: false,
      },
    }
  },
  methods: {
    //
  },
  setup() {
    const date: Ref<string> = ref('')
    return {
      date,
    }
  },
})
</script>

<style lang="scss"></style>
