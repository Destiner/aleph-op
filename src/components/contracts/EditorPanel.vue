<template>
  <div class="panel">
    <div
      class="contract"
      @click="handleContractLabelClick"
    >
      Back to {{ contract.name }}
    </div>
    <FormView
      :name="fragmentName"
      :description="''"
      :contract-inputs="fragmentInputs"
      :contract-outputs="fragmentOutputs"
      :inputs="getInputs(fragment)"
      :type="fragmentType"
      @update:inputs="(input: unknown[]) => handleInputsUpdate(fragment, input)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  Contract,
  Fragment,
  getConstructors,
  getFunctions,
  getEvents,
  getReceives,
} from '@/utils/contracts';

import FormView from './FormView.vue';

const props = defineProps<{
  contract: Contract;
  inputs: unknown[][];
  fragment: Fragment;
}>();

const emit = defineEmits<{
  'update:inputs': [value: unknown[]];
  'go-back': [];
}>();

const constructors = computed(() => getConstructors(props.contract));
const functions = computed(() => getFunctions(props.contract));
const events = computed(() => getEvents(props.contract));
const receives = computed(() => getReceives(props.contract));

const fragmentName = computed(() => {
  if (props.fragment.type === 'constructor') {
    return 'constructor';
  } else if (props.fragment.type === 'receive') {
    return 'receive';
  } else {
    return props.fragment.name;
  }
});
const fragmentInputs = computed(() => {
  if (props.fragment.type === 'function') {
    return props.fragment.outputs;
  } else {
    return [];
  }
});
const fragmentOutputs = computed(() => {
  if (props.fragment.type === 'function') {
    return props.fragment.outputs;
  } else {
    return [];
  }
});
const fragmentType = computed(() => {
  if (props.fragment.type === 'constructor') {
    return 'constructor';
  } else if (props.fragment.type === 'function') {
    return props.fragment.constant ? 'read' : 'write';
  } else {
    return 'event';
  }
});

function getInputs(fragment: Fragment): unknown[] {
  const index = getInputIndex(fragment);
  return props.inputs[index] ?? [];
}

function getInputIndex(fragment: Fragment): number {
  // We have a single array of inputs for all functions and constructors
  // Constructor inputs are first, followed by functions
  const index =
    fragment.type === 'constructor'
      ? constructors.value.indexOf(fragment)
      : fragment.type === 'function'
      ? constructors.value.length + functions.value.indexOf(fragment)
      : fragment.type === 'event'
      ? constructors.value.length +
        functions.value.length +
        events.value.indexOf(fragment)
      : constructors.value.length +
        functions.value.length +
        events.value.length +
        receives.value.indexOf(fragment);
  return index;
}

function handleInputsUpdate(fragment: Fragment, value: unknown[]): void {
  const index = getInputIndex(fragment);
  const newInputs = [...props.inputs];
  newInputs[index] = value;
  emit('update:inputs', newInputs);
}

function handleContractLabelClick(): void {
  emit('go-back');
}
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-large);
}

.contract {
  opacity: 0.6;
  font-size: var(--font-size-small);
  cursor: pointer;
}

.contract:hover {
  opacity: 1;
}

.header {
  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
}
</style>
