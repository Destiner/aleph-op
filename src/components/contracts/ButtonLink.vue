<template>
  <AlephButton
    type="regular"
    size="small"
  >
    <a
      class="link"
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="content">
        Explorer
        <IconArrowUpRightFromCircle class="icon" />
      </div>
    </a>
  </AlephButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AlephButton from '@/components/__common/AlephButton.vue';
import IconArrowUpRightFromCircle from '@/components/__common/icon/ArrowUpRightFromCircle.vue';
import useChain from '@/composables/useChain';
import { getExplorerUrl } from '@/utils/chains';

const props = defineProps<{
  address: string;
}>();

const { id: chainId } = useChain();

const url = computed<string>(() => {
  return `${explorerUrl.value}/address/${props.address}`;
});

const explorerUrl = computed<string>(() => getExplorerUrl(chainId.value));
</script>

<style scoped>
.link {
  color: var(--color-text-primary);
  text-decoration: none;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-normal);
}

.icon {
  width: 12px;
  height: 12px;
}
</style>
