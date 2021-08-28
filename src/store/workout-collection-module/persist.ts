import {Store as VuexStore } from 'vuex'

import { StateInterface } from '../index'

const persist = (store:VuexStore<StateInterface>) => {
    store.subscribe((mutation,state) => {
        console.log('payload:',state.workoutCollection)
        localStorage.setItem('workouts',
            JSON.stringify(
                state.workoutCollection.collection
            )
        )
        console.log('state changed!',mutation,state)
    })
}
export default persist
