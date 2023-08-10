<template>
  <img :src="iconPath" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ETHEREUM, OPTIMISM, BASE, ZORA, Chain } from '@/utils/chains';

const props = defineProps<{
  chain: Chain;
}>();

function getFileName(chain: Chain): string {
  switch (chain) {
    case ETHEREUM:
      return 'ethereum';
    case OPTIMISM:
      return 'optimism';
    case BASE:
      return 'base';
    case ZORA:
      return 'zora';
    default:
      return 'ethereum';
  }
}

const iconPath = computed(() => {
  return `/assets/icons/${getFileName(props.chain)}.svg`;
});
</script>
