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
</style>
