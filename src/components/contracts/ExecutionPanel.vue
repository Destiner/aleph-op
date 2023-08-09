<template>
  <div class="panel">
    <div class="header">
      <h2
        v-if="isFunction(fragment)"
        class="header-title"
      >
        {{ fragment.name }}
      </h2>
    </div>
    <div class="request">
      <AlephLabel :value="'Request'" />
      <div class="request-view">
        <AlephCodeView
          :value="request"
          compact
        />
        <AlephButton
          v-if="canQuery"
          class="button"
          type="accent"
          size="large"
          :disabled="!isValid || isLoading"
          @click="query"
        >
          Query
        </AlephButton>
      </div>
    </div>
    <div
      v-if="isFunction(fragment)"
      class="response"
    >
      <AlephLabel :value="'Response'" />
      <AlephCodeView
        :value="isLoading ? '' : error ? error : response"
        :is-loading="isLoading"
        :has-error="!!error"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseError, decodeAbiParameters, encodeFunctionData } from 'viem';
import { computed, ref, watch } from 'vue';

import AlephButton from '@/components/__common/AlephButton.vue';
import AlephCodeView from '@/components/__common/AlephCodeView.vue';
import AlephLabel from '@/components/__common/AlephLabel.vue';
import useChain from '@/composables/useChain';
import {
  Fragment,
  FunctionFragment,
  isFunction,
  isReadFunction,
} from '@/utils/contracts';
import { cleanInputs, formatInputs } from '@/utils/contracts/formatting';
import { validateInputs } from '@/utils/contracts/validation';

const props = defineProps<{
  inputs: unknown[];
  address: string;
  fragment: Fragment;
}>();

const { client: chainClient } = useChain();

const isLoading = ref(false);

const fragmentInputs = computed(() => {
  if (
    props.fragment.type === 'function' ||
    props.fragment.type === 'constructor' ||
    props.fragment.type === 'event'
  ) {
    return props.fragment.inputs;
  } else {
    return [];
  }
});
const isValid = computed(() => {
  const isParamValid = validateInputs(fragmentInputs.value, props.inputs);
  return isParamValid.every((isValid) => isValid);
});

const request = computed<string>(() => {
  switch (props.fragment.type) {
    case 'constructor': {
      return '';
    }
    case 'function': {
      return `const contract = new Contract('${props.address}', abi, provider);
await contract.${props.fragment.name}(${formatInputs(
        props.fragment.inputs,
        props.inputs,
      )});`;
    }
    default: {
      return '';
    }
  }
});

watch(
  () => request.value,
  () => {
    response.value = '';
    error.value = '';
  },
);

const canQuery = computed(
  () => isFunction(props.fragment) && isReadFunction(props.fragment),
);

async function query(): Promise<void> {
  const func = props.fragment as FunctionFragment;
  isLoading.value = true;
  const data = encodeFunctionData({
    abi: [
      {
        ...func,
      },
    ],
    args: cleanInputs(func.inputs, props.inputs),
  });
  try {
    const callReturn = await chainClient.value.call({
      to: props.address as `0x${string}`,
      data,
    });
    if (callReturn.data) {
      const values = decodeAbiParameters(func.outputs, callReturn.data);
      response.value = stringifyValues(values);
    }
  } catch (e) {
    if (e instanceof BaseError) {
      error.value = e.shortMessage;
    }
  }
  isLoading.value = false;
}

type ValueMap = Record<string, unknown>;

function stringifyValues(values: unknown[]): string {
  function convertValueNode(node: unknown): unknown {
    if (
      typeof node === 'string' ||
      typeof node === 'number' ||
      typeof node === 'boolean'
    ) {
      return node;
    }
    if (typeof node === 'bigint') {
      return node.toString();
    }
    const convertedNode: ValueMap = {};
    for (const key in node as ValueMap) {
      const childNode = (node as ValueMap)[key];
      convertedNode[key] = convertValueNode(childNode);
    }
    return convertedNode;
  }
  const convertedValues = values.map((value) => convertValueNode(value));
  return JSON.stringify(convertedValues, null, 4);
}

const response = ref<string>('');
const error = ref<string>('');
</script>

<style scoped>
.panel {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column;
  padding: 12px;
  border-radius: 4px;
  background: var(--color-bg-primary);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  margin: 0;
  font-size: var(--font-size-big);
  font-weight: normal;
}

.header-icon {
  width: 20px;
  height: 20px;
  opacity: 0.6;
  cursor: pointer;
}

.header-icon:hover {
  opacity: 1;
}

.request,
.response {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

.request-view {
  position: relative;
}

.button {
  position: absolute;
  right: 8px;
  bottom: 8px;
}
</style>
