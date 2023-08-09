<template>
  <div class="card">
    <div v-if="fragment.type === 'constructor'">constructor</div>
    <div v-else-if="fragment.type === 'function'">{{ fragment.name }}</div>
    <div v-else-if="fragment.type === 'event'">{{ fragment.name }}</div>
    <div v-else>receive</div>
    <IconArrowRight class="icon" />
  </div>
</template>

<script setup lang="ts">
import { Fragment } from '@/utils/contracts';

import IconArrowRight from '../__common/icon/ArrowRight.vue';

defineProps<{
  fragment: Fragment;
}>();
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid var(--color-border-secondary);
  border-radius: 0.5rem;
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  cursor: pointer;
  gap: var(--spacing-normal);
}

.card:hover {
  border-color: var(--color-border-primary);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.card:hover .icon {
  transform: translateX(8px);
}
</style>
