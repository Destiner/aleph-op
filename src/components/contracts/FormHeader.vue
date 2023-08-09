<template>
  <div class="header">
    <h1 class="name">
      {{ name }}
    </h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name?: string;
}>();
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: var(--spacing-normal);
}

.name {
  scroll-margin-top: 60px;
  margin: 0;
  font-size: var(--font-size-large);
}
</style>
