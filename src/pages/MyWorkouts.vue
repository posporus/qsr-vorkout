<template>
  <q-page class="q-gutter-xs">
        <div class="text-h4">
            My Workouts
        </div>
        <q-card>
            <q-list bordered>
                <q-item v-for="(workout, index) in getCollection" :key="workout.name">
                    <q-item-section>
                        <q-item-label>
                            {{ workout.name }}
                        </q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-btn @click="$router.push({name:'edit',params:{id:index}})" icon="edit"/>
                    </q-item-section>
                    <q-item-section>
                        <q-btn @click="removeWorkout(index)" icon="delete"/>
                    </q-item-section>
                    <q-item-section>
                        <q-btn @click="$router.push({name:'workout',params:{id:index}})" icon="run_circle"/>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-card>
        
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="$router.push({name:'edit',params:{id:'new'}})" fab icon="add" color="accent" />
        </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default defineComponent({
    mounted() {
        //
    },
    computed: {
        ...mapGetters('workoutCollection',['getCollection'])
    },
    methods: {
        ...mapActions('workoutCollection',['removeWorkout'])
    }

})
</script>

<style lang="scss">

</style>