<template>
  <div class="sets">
  <q-expansion-item
  :content-inset-level="0.3"
  expand-separator
  expand-icon-toggle
  v-model="expanded"
  class="set-expansion-item overflow-hidden"
  dense
  header-class="set-header"
  >

    <template v-slot:header>
      <switchable-panel v-model="expanded">
        <template v-slot:true >
          
            <q-item-section avatar>
              <number-spinner v-model="set.sets">
                x
              </number-spinner>
            </q-item-section>

            <q-item-section>
              <q-input label="Name(optional)" v-model="set.name">

              </q-input>
            </q-item-section>

       
        </template>
        <template v-slot:false >
          
            <q-item-section avatar>
              <q-avatar size="lg" color="primary" text-color="white" >
                {{set.sets}}x
            
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="text-h5">
                {{ set.name || 'Set' }}
              </div>
              
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-btn-group dense rounded>
                  <q-btn
                  dense
                  v-for="exercise in set.exercises"
                  :key="exercise.id"
                  text-color="white"
                  :color="exercise.preset.color"
                  :icon="exercise.preset.icon"
                  size="sm"
                  />
                </q-btn-group>
                
              </q-item-label>
            </q-item-section>                                                       
                                                                    
         
        </template>
      </switchable-panel>
      <!--
      <q-item-section avatar>
        
                
        <q-avatar size="lg" color="primary" text-color="white" >
          {{set.sets}}x
          
        </q-avatar>
        
      </q-item-section>
      <q-item-section>
        <div class="text-h6">
          {{ set.name }}
        </div>
      </q-item-section>
      <q-item-section>
                
        <q-item-label>
          <q-btn-group dense rounded>
            <q-btn
            dense
            v-for="exercise in set.exercises"
            :key="exercise.id"
            text-color="white"
            :color="exercise.preset.color"
            :icon="exercise.preset.icon"
            size="sm"
            />
          </q-btn-group>
          
        </q-item-label>
        
      </q-item-section>
      -->
    </template>

    <q-card class="set-box">
      <!--
      <q-item>
        <q-item-section avatar>
          <number-spinner v-model="set.sets" />
        </q-item-section>
        <q-item-section>
          <q-input dense v-model="set.name">

          </q-input>
          </q-item-section>
      </q-item>
      
      -->
        <edit-exercise v-for="(exercise,index) in set.exercises" :key="index" :_exercise="exercise" />
      

      <q-item>
        <q-item-section avatar>
          
            <q-btn round  icon="add" @click="addExercise" />
          
          
        </q-item-section>
      </q-item>

    </q-card>
    
    
  </q-expansion-item>
  
     
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditExercise from './EditExerciseComponent.vue'
import Set from 'src/classes/Set'
import {NumberSpinner} from 'components/ui'
import {SwitchablePanel} from 'components/ui'
export default defineComponent({
  data(){
    return {
      //set:{} as Set
      name: 'New Set',
      expanded: false,
    }
  },
  props: {
    _set:Set
  },
  components: {
    EditExercise,
    NumberSpinner,
    SwitchablePanel

  },
  methods: {
    addExercise() {
      this.set.addExercise()
      console.log(this.set)
    },
  },
  setup(props) {
    const set = props._set as Set
    console.log(props._set,set)
    return {
      set
    }
  },
  
})
</script>

<style lang="scss">
  .set-box {
    background-color: $grey-3;
  }
  .set-expansion-item {
    border-radius: 30px;
    //border: 1px solid grey;
    background-color:grey;
  }
  .sets {
    padding:5px
  }
</style>