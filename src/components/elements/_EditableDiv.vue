<template>
    <div contenteditable>
        {{ value }}
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    data(){
        return {
            value:this.modelValue || 0
        }
    },
    props: {
        modelValue:String
    },
    emits: [
        'update:modelValue'
    ],
    mounted() {
        this.$watch('value',() => {            
            this.$emit('update:modelValue', this.value)
        })
    },
})
</script>

<style>

</style>