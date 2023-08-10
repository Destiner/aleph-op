<template>
  <AlephPage>
    <div class="page">
      <div class="content">
        <AlephChipRadio
          v-model="selectedCategory"
          :options="categoryOptions"
        />
        <div class="tools">
          <AlephCardFeature
            v-for="tool in categoryTools"
            :key="tool.name"
            class="tool"
            :image-path="tool.iconPath"
            :title="tool.name"
            :url="tool.url"
          />
        </div>
      </div>
    </div>
  </AlephPage>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { computed, ref } from 'vue';

import AlephCardFeature from '@/components/__common/AlephCardFeature.vue';
import AlephChipRadio from '@/components/__common/AlephChipRadio.vue';
import AlephPage from '@/components/_app/AlephPage.vue';
import useTools from '@/composables/tooling/useTools';
import config from '@/config';
import { Category } from '@/utils/tooling';
import { formatCategory } from '@/utils/tooling/formatting';

const { meta } = config;
useHead({
  title: `Tooling | ${meta.title}`,
});
const { tools } = useTools();

const categories = computed<Category[]>(() => {
  const categories = new Set<Category>();

  tools.value.forEach((tool) => {
    categories.add(tool.category);
  });

  return Array.from(categories);
});

const categoryOptions = computed(() => {
  return categories.value.map((category) => {
    return {
      label: formatCategory(category),
      value: category,
    };
  });
});

const categoryTools = computed(() => {
  return tools.value.filter((tool) => {
    return tool.category === selectedCategory.value;
  });
});

const selectedCategory = ref<Category>('provider');
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  gap: var(--spacing-large);
  flex-direction: column;
  max-width: 600px;
}

.tools {
  --gap: var(--spacing-big);
  --per-row: 3;

  display: flex;
  gap: var(--gap);
  flex-wrap: wrap;
}

.tool {
  width: 100%;
}

@media (width >= 768px) {
  .tool {
    width: calc(
      100% / var(--per-row) - (var(--per-row) - 1) * var(--gap) / var(--per-row)
    );
  }
}
</style>
