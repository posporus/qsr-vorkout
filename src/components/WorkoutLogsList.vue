<template>
  <q-scroll-area class="col">
    <q-list v-if="logs.length > 0">
      <list-item-group groupBy="dateString" :items="logs">
        <!-- <template #header="{groupLabel}">
          {{groupLabel}}
        </template> -->
        <template #default="{ groupedItems }">
          <q-item class="bg-grey-2">
            <q-item-section avatar>
              <q-avatar color="grey-8" text-color="white">{{
                $dayjs(groupedItems[0].started).format('dd')
              }}</q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <h5 style="margin: 3px">
                  {{ $dayjs(groupedItems[0].started).format('DD.MM.YYYY') }}
                </h5>
              </q-item-label>
            </q-item-section>
          </q-item>
          <workout-log-item
            v-for="log in groupedItems"
            :log-item="log"
            :key="log.$id"
          />
        </template>
      </list-item-group>
    </q-list>
    <q-list v-else>
      <q-item>
        <q-item-label> no entrys on this day. </q-item-label>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WorkoutLogModel } from 'src/store/models'
import WorkoutLogItem from './WorkoutLogItem.vue'
import ListItemGroup from './ListItemGroup.vue'

export default defineComponent({
  components: { WorkoutLogItem, ListItemGroup },
  name: 'ListExerciseLogs',
  props: {
    day: {
      type: String,
    },
    sortBy: {
      type: Object,
      required: true,
    },
  },
  computed: {
    logs() {
      console.log('this.day: ', this.day !== '')
      //const logs = ExerciseLogModel.query().where((log:ExerciseLogModel) => log.dateString === this.day).withAllRecursive().all()

      return this.day !== ''
        ? WorkoutLogModel.query()
            .where('dateString', this.day)
            .orderBy(this.sortBy.condition, this.sortBy.asc ? 'asc' : 'desc')
            .withAllRecursive()
            .all()
        : WorkoutLogModel.query()
            .orderBy(this.sortBy.condition, this.sortBy.asc ? 'asc' : 'desc')
            .withAllRecursive()
            .all()

      //return ExerciseLogModel.query().withAllRecursive().all()
    },
  },
})
</script>

<style lang="scss"></style>
