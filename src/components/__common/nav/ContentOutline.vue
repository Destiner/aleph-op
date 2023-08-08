<template>
  <div class="section-list">
    <div
      v-for="(section, sectionIndex) in sections"
      :key="sectionIndex"
      class="section"
    >
      <div class="section-heading">{{ section.title }}</div>
      <div class="item-list">
        <div
          v-for="(item, itemIndex) in section.items"
          :key="itemIndex"
          class="item"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sections: Section[];
}>();
</script>

<script lang="ts">
interface Section {
  title: string;
  path: string;
  items: Item[];
}

interface Item {
  title: string;
  path: string;
}

export { Section, Item };
</script>

<style scoped>
.section-list {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column;
  transition: all 0.2s ease-in-out;
}

.section {
  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
}

.section-heading {
  opacity: 0.5;
  color: var(--color-text-primary);
}

.item-list {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

.item {
  opacity: 0.5;
  color: var(--color-text-primary);
  font-size: var(--font-size-normal);
  text-decoration: none;
  cursor: pointer;
}

.item::before {
  content: '\2012';
  display: inline-block;
  padding-right: 6px;
}

.item:hover {
  opacity: 1;
}
</style>
