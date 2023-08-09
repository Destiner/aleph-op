<template>
  <div class="list">
    <div
      v-for="(contract, index) in contracts"
      :key="index"
      class="item"
      :class="{ selected: contract.name === activeContract.name }"
      @click="handleClick(contract)"
    >
      {{ contract.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useContracts from '@/composables/contracts/useContracts';
import { Contract } from '@/utils/contracts';

defineProps<{ activeContract: Contract }>();

const emit = defineEmits<{
  select: [contract: Contract];
}>();

const { contracts } = useContracts();

function handleClick(contract: Contract): void {
  emit('select', contract);
}
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
