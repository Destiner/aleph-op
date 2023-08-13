<template>
  <AlephPage :title="activeGuide.title">
    <template #toc>
      <TableOfContents
        v-model:active="active"
        :sections="sections"
      />
    </template>
    <MarkdownView :source="activeGuide.content" />
    <template #outline>
      <ContentOutline :sections="contentSections" />
    </template>
  </AlephPage>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { computed, ref } from 'vue';

import MarkdownView from '@/components/__common/MarkdownView.vue';
import ContentOutline, {
  Section as ContentSection,
} from '@/components/__common/nav/ContentOutline.vue';
import TableOfContents, {
  Section,
} from '@/components/__common/nav/TableOfContents.vue';
import AlephPage from '@/components/_app/AlephPage.vue';
import config from '@/config';
import { recipes } from '@/utils/cookbook';
import { sluggify } from '@/utils/formatting';

const { meta } = config;
useHead({
  title: `Cookbook | ${meta.title}`,
});

const sections = computed<Section[]>(() =>
  recipes.map((section) => ({
    title: section.title,
    path: sluggify(section.title),
    pages: section.recipes.map((page) => ({
      title: page.title,
      path: sluggify(page.title),
    })),
  })),
);

const active = ref({
  sectionIndex: 1,
  pageIndex: 0,
});

const activeGuide = computed(() => {
  const section = recipes[active.value.sectionIndex];
  return section.recipes[active.value.pageIndex];
});

const contentSections = computed<ContentSection[]>(() => [
  {
    title: 'Communication basics between layers',
    path: sluggify('Communication basics between layers'),
    items: [],
  },
  {
    title: 'Communication speed',
    path: sluggify('Communication speed'),
    items: [
      {
        title: 'For Ethereum (L1) to OP Mainnet (L2) transactions',
        path: sluggify('For Ethereum (L1) to OP Mainnet (L2) transactions'),
      },
      {
        title: 'For OP Mainnet (L2) to Ethereum (L1) transactions',
        path: sluggify('For OP Mainnet (L2) to Ethereum (L1) transactions'),
      },
    ],
  },
  {
    title: 'Accessing msg.sender',
    path: sluggify('Accessing msg.sender'),
    items: [],
  },
  {
    title: 'Fees for sending data between L1 and L2',
    path: sluggify('Fees for sending data between L1 and L2'),
    items: [
      {
        title: 'Fees for L1 ⇒ L2 transactions',
        path: sluggify('Fees for L1 ⇒ L2 transactions'),
      },
      {
        title: 'Fees for L2 ⇒ L1 transactions',
        path: sluggify('Fees for L2 ⇒ L1 transactions'),
      },
    ],
  },
  {
    title: 'Understanding the challenge period',
    path: sluggify('Understanding the challenge period'),
    items: [],
  },
]);
</script>
