<template>
    <q-btn-group dense rounded glossy>
        <q-btn dense @click="value--" icon="remove_circle"/>
        <q-btn dense>
            {{ value }}
            <slot>

            </slot>
        </q-btn>
        <q-btn dense @click="value++" icon="add_circle"/>
    </q-btn-group>
</template>

<script lang="ts">

import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    data(){
        return {
            value:this.modelValue || 0
        }
    },
    props: {
        modelValue:Number
    },
    emits: [
        'update:modelValue'
    ],
    
    mounted() {
        this.$watch('value',() => {            
            this.$emit('update:modelValue', this.value)
        })
        this.$watch('modelValue',(val:number) => {
            this.value = val
        })
    },
})
</script>

<style>

</style>