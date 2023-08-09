<template>
  <div class="input">
    <AlephInput
      class="input-single"
      label="Address"
      :model-value="modelValue"
      :has-error="!isAddress(modelValue)"
      :disabled="!editable"
      size="small"
      @update:model-value="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import AlephInput from '@/components/__common/AlephInput.vue';
import { isAddress } from '@/utils/contracts/validation';

defineProps<{
  modelValue: string;
  editable: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function handleInput(value: string): void {
  emit('update:modelValue', value);
}
</script>

<style scoped>
.input {
  display: flex;
}

.input-single {
  width: 320px;
  margin: 0;
  font-size: var(--font-size-small);
}

input:focus {
  border-color: var(--color-accent);
}

input.error {
  border-color: var(--color-error);
}
</style>
