<template>
  <a
    :href="url"
    target="_blank"
  >
    <div class="card">
      <div class="header">
        <img
          class="icon"
          :src="imagePath"
        />
        <div class="title">{{ title }}</div>
      </div>
      <div class="cta">Learn more <ArrowUpRight class="cta-icon" /></div>
    </div>
  </a>
</template>

<script setup lang="ts">
import ArrowUpRight from '@/components/__common/icon/ArrowUpRight.vue';

defineProps<{
  imagePath: string;
  title: string;
  url?: string;
}>();
</script>

<style scoped>
.card {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column;
  width: 100%;
  padding: 20px 24px;
  transition: all 0.25s ease-in-out;
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--border-radius-large);
  cursor: pointer;
}

.card:hover {
  border-color: var(--color-accent);
}

.header {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

.icon {
  width: 48px;
  height: 48px;
  transition: all 0.25s ease-in-out;
  opacity: 0.7;
}

.card:hover .icon {
  opacity: 1;
}

.title {
  font-size: var(--font-size-big);
  font-weight: 700;
}

.cta {
  display: flex;
  align-items: center;
  font-size: var(--font-size-small);
  gap: var(--spacing-small);
}

.card:hover .cta {
  color: var(--color-accent);
}

.cta-icon {
  width: 14px;
  height: 14px;
}
</style>
