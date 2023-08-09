<template>
  <div class="param">
    <div class="meta">
      <div class="meta-section">
        <div
          v-if="contractOutput.name"
          class="name"
        >
          {{ contractOutput.name }}
        </div>
        <div class="type">{{ contractOutput.type }}</div>
      </div>
      <div
        v-if="contractOutput.description"
        class="meta-section"
      >
        <div class="description">
          <MarkdownView :source="contractOutput.description" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MarkdownView from '@/components/__common/MarkdownView.vue';
import { Output } from '@/utils/contracts';

defineProps<{
  contractOutput: Output;
}>();
</script>

<style scoped>
.param {
  display: flex;
  padding: 10px;
}

.param:not(:first-child) {
  border-top: 1px solid var(--color-border-primary);
}

.meta {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-normal);
}

.meta-section {
  display: flex;
  gap: var(--spacing-small);
  align-items: baseline;
}

.name {
  font-size: var(--font-size-normal);
  font-weight: bold;
}

.type {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.description {
  font-size: var(--font-size-small);
}
</style>
