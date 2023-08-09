<template>
  <AlephButton
    type="regular"
    size="small"
    @click="copy"
  >
    <div class="content">
      <IconClipboard
        v-if="ready"
        class="icon"
      />
      <IconCheck
        v-else
        class="icon"
      />
      {{ label }}
    </div>
  </AlephButton>
</template>

<script setup lang="ts">
import { useTimeout } from '@vueuse/core';
import { onMounted } from 'vue';

import AlephButton from '@/components/__common/AlephButton.vue';
import IconCheck from '@/components/__common/icon/Check.vue';
import IconClipboard from '@/components/__common/icon/Clipboard.vue';

const props = defineProps<{
  label: string;
  content: string;
}>();

onMounted(() => {
  stop();
});

const { ready, start, stop } = useTimeout(2000, { controls: true });

function copy(): void {
  navigator.clipboard.writeText(props.content);
  start();
}
</script>

<style scoped>
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
