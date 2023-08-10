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
            v-for="tool in categoryApps"
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
import useApps from '@/composables/ecosystem/useApps';
import config from '@/config';
import { Category } from '@/utils/ecosystem';
import { formatCategory } from '@/utils/ecosystem/formatting';

const { meta } = config;
useHead({
  title: `Tooling | ${meta.title}`,
});
const { apps } = useApps();

const categories = computed<Category[]>(() => {
  const categories = new Set<Category>();

  apps.value.forEach((app) => {
    categories.add(app.category);
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

const categoryApps = computed(() => {
  return apps.value.filter((app) => {
    return app.category === selectedCategory.value;
  });
});

const selectedCategory = ref<Category>('defi');
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
