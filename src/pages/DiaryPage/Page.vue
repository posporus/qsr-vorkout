<template>
  <q-page>


    
    <q-list
      class="column"
      style="position: absolute; top: 0px; bottom: 0px; width: 100%"
    >
      <q-item>
        
        <q-item-section>
          <calendar-component v-model="date" />
        </q-item-section>

        <q-item-section side>
          <sort-by-button :items="[
            {
              label:'Date',
              condition:'started'
            },
            {
              label:'Duration',
              condition:'duration'
            }
          ]"
          v-model="sortBy"/>
        </q-item-section>
      </q-item>

      <q-separator />

      <workout-logs-list :sort-by="sortBy" :day="date" />
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import CalendarComponent from './components/CalendarComponent.vue'
//import moment from 'moment'
import WorkoutLogsList from 'src/components/WorkoutLogsList.vue'
import SortByButton from 'components/SortByButton.vue'

export default defineComponent({
  components: { CalendarComponent, WorkoutLogsList,SortByButton },
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
