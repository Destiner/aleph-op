<template>
  <div
    class="view"
    v-html="md.render(source)"
  />
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

defineProps<{
  source: string;
}>();
</script>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
  line-height: 1.4;
  gap: 8px;
}

.view :deep(p) {
  margin: 0;
}

.view :deep(h1),
.view :deep(h2),
.view :deep(h3) {
  margin: 0;
}

.view :deep(code) {
  padding: 2px;
  border-radius: 4px;
  background: var(--color-bg-tertiary);
}

.view :deep(blockquote) {
  margin: 16px 0;
  padding: 8px;
  border-left: 2px solid hsla(var(--color-accent-hsl) / 30%);
  background-color: hsla(var(--color-accent-hsl) / 2%);
}

.view :deep(table) {
  display: block;
  margin: 1rem 0;
  overflow-x: auto;
  border-collapse: collapse;
}

.view :deep(tr) {
  border-top: 1px solid var(--color-border-secondary);
}

.view :deep(td),
.view :deep(th) {
  padding: 4px 8px;
  border: 1px solid var(--color-border-secondary);
}
</style>
