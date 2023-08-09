<template>
  <div class="form">
    <FormHeader :name="name" />
    <MarkdownView
      v-if="description"
      class="description"
      :source="description"
    />
    <div v-if="contractInputs.length > 0">
      <AlephLabel :value="'Inputs'" />
      <div class="params">
        <FormInput
          v-for="(contractInput, index) in contractInputs"
          :key="index"
          :contract-input="contractInput"
          :input="inputs[index]"
          @update:input="(value: unknown) => handleUpdate(index, value)"
        />
      </div>
    </div>
    <div v-if="contractOutputs.length > 0">
      <AlephLabel :value="'Outputs'" />
      <div class="params">
        <FormOutput
          v-for="(contractOutput, index) in contractOutputs"
          :key="index"
          :contract-output="contractOutput"
          :input="inputs[index]"
          @update:input="(value: unknown) => handleUpdate(index, value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AlephLabel from '@/components/__common/AlephLabel.vue';
import MarkdownView from '@/components/__common/MarkdownView.vue';
import { Input, Output } from '@/utils/contracts';

import FormHeader from './FormHeader.vue';
import FormInput from './FormInput.vue';
import FormOutput from './FormOutput.vue';

const props = defineProps<{
  name?: string;
  description?: string;
  contractInputs: Input[];
  contractOutputs: Output[];
  inputs: unknown[];
  type: 'constructor' | 'read' | 'write' | 'event';
}>();

const emit = defineEmits<{
  (e: 'update:inputs', value: unknown[]): void;
  (e: 'submit'): void;
}>();

function handleUpdate(index: number, value: unknown): void {
  const newInputs = [...props.inputs];
  newInputs[index] = value;
  emit('update:inputs', newInputs);
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-normal);
}

.description {
  font-size: var(--font-size-normal);
}

.params {
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-secondary);
}
</style>
