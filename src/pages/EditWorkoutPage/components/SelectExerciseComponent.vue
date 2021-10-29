<template>
  <q-list bordered separator>
    <q-item
      v-for="exercise in filtered" 
      :key="exercise.id"
      clickable
    >
      <q-item-section @click="selectedExercise = exercise.id">
        <q-item-label>
          {{ exercise.name }}
        </q-item-label>
        <q-item-label caption lines="1">
          <q-avatar size="sm" style="margin-left:3px" :color="category.color" v-for="category in exercise.categories" :key="category.name">
            {{ category.name.substring(0,2).toUpperCase() }}
          </q-avatar>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn flat dense icon="star" :color="exercise.isFavourite ? 'yellow' : 'grey'" @click="star(exercise?.$id || '',!exercise.isFavourite)"/>
      </q-item-section>
    </q-item>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="openEditExercise = true" />
    </q-page-sticky>
    <edit-exercise-dialog v-model="openEditExercise" />
  </q-list>
</template>

<script lang="ts">
import EditExerciseDialog from 'src/components/EditExerciseDialog.vue'
import { FilterButtonOption } from 'src/types'
import { ExerciseModel } from 'src/store/models'
import { defineComponent, PropType } from 'vue'


export default defineComponent({
  components: { EditExerciseDialog },
  name: 'SelectExerciseComponent',
  data() {
    return {
      selectedExercise: '',
      openEditExercise: false,
    }
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    filterBy: {
      type: String,
      default: '',
    },
    showCategories: {
      type: Array as PropType<FilterButtonOption[]>,
    },
    filterFavouries: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'update:show'],
  mounted() {
    this.$watch('selectedExercise', (selectedExercise: string) => {
      this.$emit('update:modelValue', selectedExercise)
    })
    this.$watch('modelValue', (modelValue: string) => {
      this.selectedExercise = modelValue
    })
  },
  computed: {
    filtered() {
      const needle = this.filterBy.toLowerCase()
      return this.exercises.filter(
        (v) => v.name.toLowerCase().indexOf(needle) > -1
      )
    },
    exercises() {
      const category_ids:string[] = this.showCategories?.map((category:FilterButtonOption) => category.value) || []
      console.log('category_ids', category_ids)
      return ExerciseModel.query().whereHas('categories',(query) => {
        if(category_ids.length > 0)
        {query.whereIdIn(
          category_ids
        )}
      }).with('categories').orderBy(this.filterFavouries ? 'isFavourite':'','desc').all()
    },
  },
  methods: {
    star(exerciseId:string,fav:boolean) {
      void ExerciseModel.update({
        where:exerciseId,
        data: {
          isFavourite:fav
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
