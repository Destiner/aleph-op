<template>
  <AlephPage>
    <template #toc>
      <nav class="methods">
        <AlephModal
          v-if="isPhone"
          :is-open="isModalOpen"
          @close="handleModalClose"
        >
          <MethodList
            :selected="selectedMethod"
            @select="handleMethodSelect"
          />
        </AlephModal>
        <MethodList
          v-else
          :selected="selectedMethod"
          @select="handleMethodSelect"
        />
        <div
          v-if="isPhone"
          class="method-button"
          @click="openModal"
        >
          {{ selectedMethod.id }}
          <IconChevronDown class="dropdown-icon" />
        </div>
      </nav>
    </template>
    <article class="method">
      <MethodEditor
        v-model:inputs="inputs"
        :method="selectedMethod"
      />
    </article>
    <template #details>
      <div class="execution">
        <MethodExecution
          v-model:is-error="isError"
          v-model:is-shown="isShown"
          :inputs="inputs"
          :method="selectedMethod"
        />
      </div>
    </template>
  </AlephPage>
</template>

<script setup lang="ts">
import { useBreakpoints, useUrlSearchParams } from '@vueuse/core';
import { useHead } from '@vueuse/head';
import { onMounted, ref, watch } from 'vue';

import AlephModal from '@/components/__common/AlephModal.vue';
import IconChevronDown from '@/components/__common/icon/ChevronDown.vue';
import AlephPage from '@/components/_app/AlephPage.vue';
import MethodEditor from '@/components/jsonRpc/MethodEditor.vue';
import MethodExecution from '@/components/jsonRpc/MethodExecution.vue';
import MethodList from '@/components/jsonRpc/MethodList.vue';
import useMethods from '@/composables/jsonRpc/useMethods';
import config from '@/config';
import { Method, Param, getArrayParamItem } from '@/utils/jsonRpc/methods';

const breakpoints = useBreakpoints({
  tablet: 640,
});
const { meta } = config;
useHead({
  title: `JSON-RPC | ${meta.title}`,
});
const isPhone = breakpoints.smaller('tablet');
const params = useUrlSearchParams('history');
const { methods } = useMethods();

onMounted(() => {
  const method = methods.value.find((method) => method.id === params.method);
  if (method) {
    selectedMethod.value = method;
  }
  resetParamInputs();
});

const isModalOpen = ref(false);
function openModal(): void {
  isModalOpen.value = true;
}
function handleModalClose(): void {
  isModalOpen.value = false;
}

function handleMethodSelect(method: Method): void {
  selectedMethod.value = method;
  isShown.value = false;
  isError.value = false;
  isModalOpen.value = false;
  resetParamInputs();
}

const selectedMethod = ref<Method>(methods.value[0]);
watch(selectedMethod, () => {
  params.method = selectedMethod.value.id;
});

const inputs = ref<unknown[]>([]);

function resetParamInputs(): void {
  const newInputs = [];
  for (const param of selectedMethod.value.params) {
    const input = getDefaultParamValue(param);
    newInputs.push(input);
  }
  inputs.value = newInputs;
}

function getDefaultParamValue(param: Param): unknown {
  if (param.type === 'array') {
    const length = param.count ? param.count : 1;
    return Array.from({ length }, (_, i) =>
      getDefaultParamValue(getArrayParamItem(param, i)),
    );
  }
  if (param.type === 'object') {
    return Object.fromEntries(
      Object.entries(param.items).map(([key, value]) => [
        key,
        getDefaultParamValue(value),
      ]),
    );
  }
  if (param.isRequired) {
    return param.default;
  }
  if (param.type === 'boolean') {
    return false;
  }
  return '';
}

const isShown = ref(false);
const isError = ref(false);
</script>

<style scoped>
main {
  --section-padding: 8px 12px;

  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
  min-height: calc(100vh - 64px);
}

@media (width >= 768px) {
  main {
    flex-direction: row;
    gap: 0;
  }
}

.methods {
  display: flex;
  position: sticky;
  top: 0;
  gap: var(--spacing-normal);
  flex: 1;
  flex-direction: column;
  max-height: 220px;
  overflow-x: auto;
  overflow-y: auto;
}

@media (width >= 768px) {
  .methods {
    max-height: calc(100vh - var(--header-height));
  }
}

.method-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-medium);
  font-size: var(--font-size-normal);
  cursor: pointer;
}

.dropdown-icon {
  width: 20px;
  height: 20px;
}

.method {
  display: flex;
  gap: var(--spacing-large);
  flex: 3;
  flex-direction: column;
  border-top: 1px solid var(--color-border-primary);
}

@media (width >= 768px) {
  .method {
    border-top: none;
  }
}

.execution {
  display: flex;
  gap: var(--spacing-big);
  flex: 2;
  flex-direction: column;
  border-top: 1px solid var(--color-border-primary);
}

@media (width >= 768px) {
  .execution {
    border-top: none;
  }
}
</style>
