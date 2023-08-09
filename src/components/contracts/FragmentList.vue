<template>
  <h2>{{ title }}</h2>
  <div class="list">
    <FragmentCard
      v-for="(fragment, index) in fragments"
      :key="index"
      class="fragment"
      :fragment="fragment"
      @click="handleClick(fragment)"
    />
  </div>
</template>

<script setup lang="ts">
import { Fragment } from '@/utils/contracts';

import FragmentCard from './FragmentCard.vue';

defineProps<{
  title: string;
  fragments: Fragment[];
}>();

const emit = defineEmits<{
  select: [fragment: Fragment];
}>();

function handleClick(fragment: Fragment): void {
  emit('select', fragment);
}
</script>

<style scoped>
.list {
  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
}
</style>
