<template>
  <div class="list">
    <div
      v-for="option in options"
      :key="option.value"
      class="item"
      :class="{ active: modelValue === option.value }"
      @click="handleItemClick(option.value)"
    >
      {{ option.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  options: Option[];
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function handleItemClick(value: string): void {
  emit('update:modelValue', value);
}
</script>

<script lang="ts">
interface Option {
  label: string;
  value: string;
}

// eslint-disable-next-line import/prefer-default-export
export { Option };
</script>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-normal);
}

.item {
  display: flex;
  gap: var(--spacing-small);
  padding: 6px 10px;
  transition: all 0.25s ease-in-out;
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  font-size: var(--font-size-normal);
  cursor: pointer;
}

.item:hover {
  border-color: var(--color-border-secondary);
}

.item.active {
  border-color: var(--color-border-secondary);
  background: var(--color-bg-secondary);
}
</style>
