<template>
  <div class="wrapper">
    <TabGroup
      :selected-index="selectedIndex"
      @change="handleChange"
    >
      <TabList class="list">
        <Tab
          v-for="option in options"
          :key="option.label"
          class="item"
          :class="{ selected: option.value === modelValue }"
        >
          {{ option.label }}
        </Tab>
      </TabList>
    </TabGroup>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab } from '@headlessui/vue';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  options: Option[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const selectedIndex = computed<number>(() => {
  return props.options.findIndex((option) => option.value === props.modelValue);
});

function handleChange(index: number): void {
  emit('update:modelValue', props.options[index].value);
}
</script>

<script lang="ts">
interface Option {
  value: string;
  label: string;
}

// eslint-disable-next-line import/prefer-default-export
export { Option };
</script>

<style scoped>
.wrapper {
  display: flex;
}

.list {
  display: flex;
  width: 100%;
  padding: 4px;
  border-radius: var(--border-radius-big);
  background: var(--color-bg-tertiary);
  gap: var(--spacing-small);
}

.item {
  flex: 1;
  padding: 4px 8px;
  border: none;
  border-radius: var(--border-radius-medium);
  outline: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-normal);
  cursor: pointer;
}

.item:hover {
  color: var(--color-text-primary);
}

.item.selected {
  background: white;
  color: var(--color-text-primary);
}
</style>
