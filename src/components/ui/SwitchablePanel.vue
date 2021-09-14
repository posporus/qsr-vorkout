<template>
        
    <q-item class="switchable-panel" :class="!modelValue ? 'hidden' : 'show'">
        <slot name="true"/>
    </q-item>

    <q-item class="switchable-panel" :class="modelValue ? 'hidden' : 'show'">
        <slot name="false"/>
    </q-item>
    <!--
    <q-tab-panels
    v-model="tab"
    animated
    transition-prev="fade"
    transition-next="fade"
    >
        <q-tab-panel :name="0">
            <slot name="true">
            </slot>
        </q-tab-panel>
        <q-tab-panel :name="1">
            <slot name="false">
            </slot>
        </q-tab-panel>
    </q-tab-panels>
    -->
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    data(){
        return {
            tab:0
        }
    },
    props: {
        modelValue:Boolean
    },

    
    mounted() {
        this.tab = this.modelValue ? 0 : 1
        this.$watch('modelValue',(val:boolean) => {
            this.tab = val ? 0 : 1
        })
    },
})
</script>

<style lang="scss">
    .hidden {
        opacity:0;
    }
    .show {
        opacity:1;
    }
    .switchable-panel {
        width: 100%;
        //transition: all, 1s, ease;
        //background-color:$grey-3;
        //border-radius:30px;
    }
</style>