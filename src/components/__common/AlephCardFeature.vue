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
      <div
        v-if="description"
        class="description"
      >
        {{ description }}
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  imagePath: string;
  title: string;
  description?: string;
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
  transition: all 0.2s ease-in-out;
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
}

.title {
  font-size: var(--font-size-big);
  font-weight: 700;
}

.description {
  font-size: var(--font-size-small);
}
</style>
