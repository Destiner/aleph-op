<template>
  <div class="wrapper">
    <div class="list">
      <div
        v-for="method in availableMethods"
        :key="method.id"
        class="item"
        :class="{ selected: method.id === selected.id }"
        @click="emit('select', method)"
      >
        {{ method.id }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

import AlephInput from '@/components/__common/AlephInput.vue';
import useMethods from '@/composables/jsonRpc/useMethods';
import { Method } from '@/utils/jsonRpc/methods';

defineProps<{
  selected: Method;
}>();

const emit = defineEmits<{
  (e: 'select', value: Method): void;
}>();

const { cmd_slash } = useMagicKeys();
const { methods } = useMethods();

const inputEl = ref<InstanceType<typeof AlephInput> | null>(null);

const methodQuery = ref('');

const availableMethods = computed(() =>
  methods.value.filter((method) =>
    method.id.toLowerCase().includes(methodQuery.value.toLowerCase()),
  ),
);

watch(cmd_slash, (pressed) => {
  if (pressed) {
    inputEl.value?.focus();
  }
});
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
}

@media (width >= 768px) {
  .list {
    overflow-x: auto;
    overflow-y: auto;
  }
}

.item {
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
  .item {
    overflow-x: initial;
    font-size: var(--font-size-normal);
  }
}

.item:hover {
  color: hsla(var(--color-accent-hsl) / 90%);
  cursor: pointer;
}

.item.selected {
  border-width: 2px;
  border-color: hsla(var(--color-accent-hsl) / 50%);
  color: var(--color-accent);
}
</style>
