<template>
  <div
    class="param"
    :class="{ compound: isCompound(contractInput) }"
  >
    <div class="meta">
      <div class="meta-section">
        <div
          v-if="contractInput.name"
          class="name"
        >
          {{ contractInput.name }}
        </div>
        <div class="type">{{ contractInput.type }}</div>
      </div>
      <div
        v-if="contractInput.description"
        class="meta-section"
      >
        <div class="description">
          <MarkdownView :source="contractInput.description" />
        </div>
      </div>
    </div>
    <div v-if="isArray(contractInput)">
      <FormInput
        v-for="(itemInput, index) in input as unknown[]"
        :key="index"
        :contract-input="getArrayParamItem(contractInput, index)"
        :input="itemInput"
        @update:input="(value: unknown) => handleArrayUpdate(index, value)"
        @blur="() => handleArrayBlur(index)"
      />
    </div>
    <div v-else-if="isTuple(contractInput)">
      <FormInput
        v-for="(itemInput, index) in input as unknown[]"
        :key="index"
        :contract-input="contractInput.components[index]"
        :input="itemInput"
        @update:input="(value: unknown) => handleTupleUpdate(index, value)"
      />
    </div>
    <div v-else-if="isTupleArray(contractInput)">
      <FormInput
        v-for="(itemInput, index) in input as unknown[]"
        :key="index"
        :contract-input="getTupleArrayParamItem(contractInput, index)"
        :input="itemInput"
        @update:input="(value: unknown) => handleTupleArrayUpdate(index, value)"
      />
    </div>
    <div v-else-if="contractInput.type === 'bool'">
      <AlephToggle
        :model-value="input as boolean"
        @update:model-value="handleUpdate"
      />
    </div>
    <div v-else>
      <AlephInput
        :model-value="input as string"
        class="value"
        :has-error="!validateInput(contractInput, input)"
        type="text"
        @update:model-value="handleUpdate"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AlephInput from '@/components/__common/AlephInput.vue';
import AlephToggle from '@/components/__common/AlephToggle.vue';
import MarkdownView from '@/components/__common/MarkdownView.vue';
import FormInput from '@/components/contracts/FormInput.vue';
import {
  Input,
  getArrayParamItem,
  getTupleArrayParamItem,
  isArray,
  isTuple,
  isTupleArray,
} from '@/utils/contracts';
import { validateInput } from '@/utils/contracts/validation';

const props = defineProps<{
  contractInput: Input;
  input: unknown;
}>();

const emit = defineEmits<{
  (e: 'update:input', value: unknown): void;
  (e: 'blur'): void;
}>();

function isCompound(input: Input): boolean {
  return isArray(input) || isTuple(input) || isTupleArray(input);
}

function handleUpdate(input: unknown): void {
  emit('update:input', input);
}

function handleArrayUpdate(index: number, value: unknown): void {
  const arrayInput = props.input as unknown[];
  const inputValue = value as string | boolean;
  const newInput = [...arrayInput];
  if (index === arrayInput.length - 1) {
    if (typeof inputValue === 'string') {
      if (inputValue !== '') {
        newInput.push('');
      }
    }
  }
  newInput[index] = value;
  emit('update:input', newInput);
}

function handleArrayBlur(index: number): void {
  const arrayInput = props.input as (string | boolean)[];
  const inputValue = arrayInput[index];
  // Always keep the first element
  if (index === 0) {
    return;
  }
  // Only trigger if the last element is updated
  if (index !== arrayInput.length - 1) {
    return;
  }
  if (typeof inputValue !== 'string') {
    return;
  }
  // Only trigger if the input is clean
  if (inputValue !== '') {
    return;
  }
  // Remove the last element from the list
  const newInput = arrayInput.slice(0, arrayInput.length - 1);
  emit('update:input', newInput);
}

function handleTupleUpdate(index: number, value: unknown): void {
  const arrayInput = props.input as unknown[];
  const newInput = [...arrayInput];
  newInput[index] = value;
  emit('update:input', newInput);
}

function handleTupleArrayUpdate(index: number, value: unknown): void {
  const arrayInput = props.input as unknown[];
  const newInput = [...arrayInput];
  newInput[index] = value;
  emit('update:input', newInput);
}

function handleBlur(): void {
  emit('blur');
}
</script>

<style scoped>
.param {
  display: flex;
  padding: 10px;
}

.param:not(:first-child) {
  border-top: 1px solid var(--color-border-primary);
}

.param.compound {
  flex-direction: column;
  padding-right: 0;
  padding-bottom: 0;
}

.meta {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-normal);
}

.meta-section {
  display: flex;
  gap: var(--spacing-small);
  align-items: baseline;
}

.name {
  font-size: var(--font-size-normal);
  font-weight: bold;
}

.type {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.description {
  font-size: var(--font-size-small);
}

.value {
  width: 140px;
  text-align: right;
}
</style>
