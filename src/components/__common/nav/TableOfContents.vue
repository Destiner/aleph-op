<template>
  <div class="section-list">
    <div
      v-for="(section, sectionIndex) in sections"
      :key="sectionIndex"
      class="section"
    >
      <h2>{{ section.title }}</h2>
      <div class="page-list">
        <div
          v-for="(page, pageIndex) in section.pages"
          :key="pageIndex"
          class="page"
          :class="{
            active:
              active.sectionIndex === sectionIndex &&
              active.pageIndex === pageIndex,
          }"
          @click="select(sectionIndex, pageIndex)"
        >
          {{ page.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sections: Section[];
  active: Selection;
}>();

const emit = defineEmits<{
  'update:active': [selection: Selection];
}>();

function select(sectionIndex: number, pageIndex: number): void {
  emit('update:active', {
    sectionIndex,
    pageIndex,
  });
}
</script>

<script lang="ts">
interface Selection {
  sectionIndex: number;
  pageIndex: number;
}

interface Section {
  title: string;
  path: string;
  pages: Page[];
}

interface Page {
  title: string;
  path: string;
}

export { Selection, Section, Page };
</script>

<style scoped>
.section-list {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}

.section {
  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
}

h2 {
  margin: 0;
  font-size: var(--font-size-normal);
}

.page-list {
  display: flex;
  flex-direction: column;
}

.page {
  display: flex;
  position: relative;
  align-items: center;
  padding: 6px 8px;
  overflow-x: hidden;
  border-left: 1px solid hsla(var(--color-text-secondary-hsl) / 20%);
  border-radius: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-big);
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (width >= 768px) {
  .page {
    overflow-x: initial;
    font-size: var(--font-size-normal);
  }
}

.page:hover {
  color: hsla(var(--color-accent-hsl) / 90%);
  cursor: pointer;
}

.page.active {
  border-width: 2px;
  border-color: hsla(var(--color-accent-hsl) / 50%);
  color: var(--color-accent);
}
</style>
