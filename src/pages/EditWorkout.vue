<template>
    <q-page padding class="edit-page">
        is new: {{isNew}}
        <q-form>
            <q-list bordered class="rounded-borders edit-box">
                <q-item bordered >
                    <q-item-section>
                        <q-input dense label="Name your workout" v-model="workout.name"></q-input>
                    </q-item-section>
                </q-item>
                <edit-set v-for="(set,index) in workout.sets" :workout="workout" :_set="set" :key="index" />
                <q-item>
                    <q-btn icon="add" v-on:click="addSet">add set</q-btn>
                </q-item>
            </q-list>
        </q-form>
        <q-btn @click="save">
            save
        </q-btn>
    </q-page>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Workout, { WorkoutNeat } from './../classes/Workout'
import EditSet from './../components/edit/EditSet.vue'
import { mapActions, mapGetters } from 'vuex'
//import { store } from 'quasar/wrappers'
//import { WorkoutCollection } from 'src/store/workout-collection-module/state'
export default defineComponent({
    data() {
        return {
            workout: {} as Workout,
            //index: false as number | false //index of workout collection state. false if not in state yet.
            //exportedWorkout:'harry'
        }
    },
    props: {
        id:String
    },
    components: {
        EditSet
    },
    beforeMount() {
        //this.newWorkout()
        this.workout = new Workout
        //this.workout = workout
        console.log('created workout!',this.workout)
    },
    mounted() {
        //console.log('prop:id ',this.id)
        
        //this.workout = new Workout()
        console.log('mounted!',this.workout)
        if(!this.isNew) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const workoutData:WorkoutNeat = this.getWorkout(this.id) as WorkoutNeat
            console.log('edit: ',workoutData)
            //this.getWorkout(parseInt(this.id))
            
            this.workout.importWorkout(workoutData)
            
        }
    },
    computed: {
        ...mapGetters('workoutCollection',['getWorkout','getLength']),
        isNew() {
            if(this.id ==='new' || typeof this.id === undefined) {
                return true
            }
            else {
                return false
            }
        }
    },
    methods: {
        ...mapActions({
            addWorkout:'workoutCollection/addWorkout',
            changeWorkout:'workoutCollection/changeWorkout'
        }),
        
        save() {
            
            const exported = this.workout.exportWorkout()
            if(this.isNew) {
                this.addWorkout(exported).then(() => {
                                       
                    console.log('workout saved.')
                    void this.$router.push(({name:'edit',params:{id:this.getLength - 1}}))
                }).catch((err) => console.error(err))
            }
            else {
                const id = parseInt(this.id || '-1')
                this.changeWorkout({index:id,changedWorkout:exported})
                .then(() => {
                    console.log('workout updated.')
                })
                .catch((err) => console.error(err))
            }
            
        },
        addSet() {
            //console.log('workout',this.workout)
            this.workout.addSet()
        },
        exportWorkout() {
            console.log(JSON.stringify(this.workout.exportWorkout()))
            
        },
        importWorkout() {
            this.workout.importWorkout(JSON.parse('{"id":null,"name":"Mama","sets":[{"hasName":true,"name":"Jey","sets":3,"exercises":[{"name":"Kulla","hasReps":false,"reps":8,"hasTimer":true,"timer":30},{"name":"Mulla","hasReps":true,"reps":8,"hasTimer":false,"timer":30}]},{"hasName":false,"name":"","sets":3,"exercises":[{"name":"Pullaps","hasReps":true,"reps":8,"hasTimer":false,"timer":30},{"name":"Pause","hasReps":false,"reps":8,"hasTimer":true,"timer":30}]}]}'))
        }
        
    }
})
</script>

<style lang="scss">
    .edit-page {
        background: rgb(34,193,195);
        background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
    }
    .edit-box {
        background: rgba(255,255,255,0.7)
    }
</style>