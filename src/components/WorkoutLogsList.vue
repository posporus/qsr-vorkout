<template>
  <template v-if="logs.length > 0">
    <list-item-group groupBy="dateString" :items="logs">
      <template #default="{ groupedItems }">
        <q-card>
          <q-list>
            <q-item dense>
              <q-item-section>
                <q-item-label header>
                  {{
                    $dayjs(groupedItems[0].started).format('ddd, DD.MM.YYYY')
                  }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <workout-log-item
              v-for="(log, index) in groupedItems"
              :log-item="log"
              :key="log"
              time
              :separator="index < groupedItems.length - 1"
            />
          </q-list>
        </q-card>
      </template>
    </list-item-group>
  </template>
  <template v-else>
    <q-item>
      <q-item-label> no entrys on this day. </q-item-label>
    </q-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WorkoutLogModel } from 'src/store/models'
import WorkoutLogItem from './WorkoutLogItem.vue'
import ListItemGroup from './ListItemGroup.vue'
import { Collection } from '@vuex-orm/core'

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
    logs(): Collection<WorkoutLogModel> {
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
