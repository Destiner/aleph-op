<template>
  <AddressInput
    :model-value="modelValue"
    :editable="false"
    @update:model-value="(value) => emit('update:model-value', value)"
  />
</template>

<script setup lang="ts">
import AddressInput from './AddressInput.vue';

defineProps<{
  modelValue: string;
  address: string;
}>();

const emit = defineEmits<{
  (e: 'update:model-value', value: string): void;
}>();
</script>
