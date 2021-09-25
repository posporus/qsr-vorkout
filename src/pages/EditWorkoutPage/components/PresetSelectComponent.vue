<template>
  <q-item-section>
    <q-tabs
      dense
      v-model="model"
      :options="presets"
      size="sm"
      class="text-white"
    >
      <q-tab
        v-for="tab in presets"
        :key="tab.name"
        :icon="tab.icon"
        :name="tab.name"
        :class="'bg-' + tab.color"
      />
    </q-tabs>

    <q-tab-panels
      v-model="model"
      animated
      transition-prev="fade"
      transition-next="fade"
    >
      <q-tab-panel
        v-for="preset in presets"
        :key="preset.name"
        :name="preset.name"
        :class="'bg-' + preset.color"
      >
        <q-card>
          <q-item>
            <q-item-section avatar>
              <q-item-label>
                {{ preset.name }}
              </q-item-label>
              <q-item-label caption>
                {{ preset.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <slot v-bind:preset="preset" />
          </q-item>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-item-section>
</template>

<script lang="ts">
import Exercise from 'src/classes/Exercise';
import { defineComponent } from 'vue';
import { presets } from 'src/classes/PresetController';

export default defineComponent({
  data() {
    return {
      model: this.modelValue,
      presets: presets,
    };
  },
  props: {
    _exercise: Exercise,
    modelValue: String,
  },
  emits: ['update:modelValue'],
  beforeCreate() {
    this.exercise = this._exercise as Exercise;
  },
  mounted() {
    this.$watch('model', () => {
      this.$emit('update:modelValue', this.model);
    });
  },
  setup(props) {
    const exercise = props._exercise as Exercise;
    return {
      exercise,
    };
  },
  computed: {},
});
</script>

<style></style>
