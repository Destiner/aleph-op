<template>
  <img :src="iconPath" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  ETHEREUM,
  OPTIMISM,
  OPTIMISM_GOERLI,
  BASE,
  BASE_GOERLI,
  ZORA,
  ZORA_TESTNET,
  MODE_SEPOLIA,
  Chain,
} from '@/utils/chains';

const props = defineProps<{
  chain: Chain;
}>();

function getFileName(chain: Chain): string {
  switch (chain) {
    case ETHEREUM:
      return 'ethereum';
    case OPTIMISM:
    case OPTIMISM_GOERLI:
      return 'optimism';
    case BASE:
    case BASE_GOERLI:
      return 'base';
    case ZORA:
    case ZORA_TESTNET:
      return 'zora';
    case MODE_SEPOLIA:
      return 'mode';
    default:
      return 'ethereum';
  }
}

const iconPath = computed(() => {
  return `/assets/icons/${getFileName(props.chain)}.svg`;
});
</script>
