<template>
  <div class="header">
    <div class="type">{{ method.type }}</div>
    <div class="id">{{ method.id }}</div>
  </div>
  <div class="description">
    {{ method.description }}
  </div>
  <MethodForm
    v-if="hasParams"
    :inputs="inputs"
    :params="method.params"
    @update:inputs="handleUpdate"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Method } from '@/utils/jsonRpc/methods';

import MethodForm from './MethodForm.vue';

const props = defineProps<{
  method: Method;
  inputs: unknown[];
}>();

const emit = defineEmits<{
  (e: 'update:inputs', value: unknown[]): void;
}>();

const hasParams = computed(() => props.method.params.length > 0);

function handleUpdate(value: unknown[]): void {
  emit('update:inputs', value);
}
</script>

<style scoped>
.header {
  display: flex;
  gap: var(--spacing-small);
  align-items: center;
}

.type {
  padding: 2px 4px;
  border-radius: var(--border-radius-small);
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  font-size: var(--font-size-tiny);
  text-transform: uppercase;
}

.id {
  color: var(--color-text-secondary);
}

.description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-normal);
}

.params {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

.param-list {
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-secondary);
}

.param {
  display: flex;
  padding: 10px;
}

.param:not(:first-child) {
  border-top: 1px solid var(--color-border-primary);
}

.param-meta {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-normal);
}

.param-meta-section {
  display: flex;
  gap: var(--spacing-small);
  align-items: baseline;
}

.param-name {
  font-size: var(--font-size-normal);
  font-weight: bold;
}

.param-type {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.param-required {
  color: var(--color-error);
}

.param-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.param-value {
  width: 140px;
  text-align: right;
}
</style>
