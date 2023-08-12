<template>
  <AlephPage :title="activeDoc.title">
    <template #toc>
      <TableOfContents
        :sections="sections"
        :active="active"
      />
    </template>
    <MarkdownView :source="activeDoc.content" />
    <template #outline>
      <ContentOutline :sections="contentSections" />
    </template>
  </AlephPage>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { computed } from 'vue';

import MarkdownView from '@/components/__common/MarkdownView.vue';
import ContentOutline, {
  Section as ContentSection,
} from '@/components/__common/nav/ContentOutline.vue';
import TableOfContents, {
  Section,
} from '@/components/__common/nav/TableOfContents.vue';
import AlephPage from '@/components/_app/AlephPage.vue';
import config from '@/config';
import { docs } from '@/utils/docs';
import { sluggify } from '@/utils/formatting';

const { meta } = config;
useHead({
  title: `Docs | ${meta.title}`,
});

const sections = computed<Section[]>(() =>
  docs.map((doc) => ({
    title: doc.title,
    path: sluggify(doc.title),
    pages: doc.docs.map((page) => ({
      title: page.title,
      path: sluggify(page.title),
    })),
  })),
);

const active = computed(() => ({
  sectionIndex: 0,
  pageIndex: 1,
}));

const activeDoc = computed(() => {
  const section = docs[active.value.sectionIndex];
  return section.docs[active.value.pageIndex];
});

const contentSections = computed<ContentSection[]>(() => [
  {
    title: 'Finding contract addresses',
    path: sluggify('Finding contract addresses'),
    items: [],
  },
  {
    title: 'Interacting from another contract',
    path: sluggify('Interacting from another contract'),
    items: [
      {
        title: 'Installing via NPM or Yarn',
        path: sluggify('Installing via NPM or Yarn'),
      },
      {
        title: 'Importing contracts',
        path: sluggify('Importing contracts'),
      },
      {
        title: 'Getting L2 contract addresses',
        path: sluggify('Getting L2 contract addresses'),
      },
    ],
  },
  {
    title: 'Interacting from the client side',
    path: sluggify('Interacting from the client side'),
    items: [
      {
        title: 'Installing via NPM or Yarn',
        path: sluggify('Installing via NPM or Yarn'),
      },
      {
        title: 'Getting contract artifacts, interfaces, and ABIs',
        path: sluggify('Getting contract artifacts, interfaces, and ABIs'),
      },
      {
        title: 'Getting L2 contract addresses',
        path: sluggify('Getting L2 contract addresses'),
      },
    ],
  },
]);
</script>
