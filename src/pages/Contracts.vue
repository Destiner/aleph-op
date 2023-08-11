<template>
  <AlephPage :title="pageTitle">
    <template #toc>
      <NavSidebarModal
        v-if="isPhone"
        :active-contract="activeContract"
        :is-open="isSidebarModalOpen"
        @close="handleSidebarModalClose"
        @select="handleContractSelect"
      />
      <NavSidebar
        v-else
        :active-contract="activeContract"
        @select="handleContractSelect"
      />
      <div
        v-if="isPhone"
        class="trigger-button"
        @click="openSidebarModal"
      >
        Click to select…
        <IconChevronDown class="dropdown-icon" />
      </div>
    </template>
    <article class="editor">
      <EditorPanel
        v-if="activeContract && activeFragment"
        v-model:inputs="inputs"
        :contract="activeContract"
        :fragment="activeFragment"
        @go-back="handleEditorPanelGoBack"
      />
      <OverviewPanel
        v-else-if="activeContract"
        :address="address"
        :contract="activeContract"
        @select="handleFragmentSelect"
      />
    </article>
    <template #details>
      <ExecutionPanel
        v-if="activeContract && activeFragment"
        :inputs="inputs"
        :address="address"
        :fragment="activeFragment"
      />
    </template>
    <template #outline>
      <OutlinePanel
        v-if="activeContract && !activeFragment"
        :contract="activeContract"
      />
    </template>
  </AlephPage>
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core';
import { useHead } from '@vueuse/head';
import { computed, ref, watch } from 'vue';

import IconChevronDown from '@/components/__common/icon/ChevronDown.vue';
import AlephPage from '@/components/_app/AlephPage.vue';
import EditorPanel from '@/components/contracts/EditorPanel.vue';
import ExecutionPanel from '@/components/contracts/ExecutionPanel.vue';
import NavSidebar from '@/components/contracts/NavSidebar.vue';
import NavSidebarModal from '@/components/contracts/NavSidebarModal.vue';
import OutlinePanel from '@/components/contracts/OutlinePanel.vue';
import OverviewPanel from '@/components/contracts/OverviewPanel.vue';
import useContracts from '@/composables/contracts/useContracts';
import useChain from '@/composables/useChain';
import config from '@/config';
import {
  Fragment,
  Contract,
  Input,
  getArrayParamItem,
  getConstructors,
  getFunctions,
  getEvents,
  getReceives,
  isArray,
  isTuple,
  isTupleArray,
} from '@/utils/contracts';

const { contracts } = useContracts();
const { id: chainId } = useChain();
const { meta } = config;
useHead({
  title: `Contracts | ${meta.title}`,
});
const breakpoints = useBreakpoints({
  tablet: 640,
});
const isPhone = breakpoints.smaller('tablet');

const pageTitle = computed<string | undefined>(() => {
  if (!activeContract.value) {
    return undefined;
  }
  return `${activeContract.value.name}`;
});

const isSidebarModalOpen = ref(false);
function handleSidebarModalClose(): void {
  isSidebarModalOpen.value = false;
}
function openSidebarModal(): void {
  isSidebarModalOpen.value = true;
}
function handleContractSelect(contract: Contract): void {
  isSidebarModalOpen.value = false;
  activeContract.value = contract;
  activeFragment.value = null;
}
function handleEditorPanelGoBack(): void {
  activeFragment.value = null;
}
function handleFragmentSelect(fragment: Fragment): void {
  activeFragment.value = fragment;
}

const activeContract = ref(contracts.value[0]);
const activeFragment = ref<Fragment | null>(null);
const address = ref<string>('');
const inputs = ref<unknown[][]>([]);
watch(
  chainId,
  () => {
    address.value = getAddress(activeContract.value);
  },
  {
    immediate: true,
  },
);
watch(
  activeContract,
  () => {
    address.value = getAddress(activeContract.value);
    if (activeContract.value) {
      resetInputs(activeContract.value);
    }
  },
  {
    immediate: true,
  },
);

function resetInputs(contract: Contract): void {
  const newInputs: unknown[][] = [];
  getConstructors(contract).forEach((con) => {
    const conInputs = con.inputs.map((input) => getDefaultInputValue(input));
    newInputs.push(conInputs);
  });
  getFunctions(contract).forEach((func) => {
    const funcInputs = func.inputs.map((input) => getDefaultInputValue(input));
    newInputs.push(funcInputs);
  });
  getEvents(contract).forEach((event) => {
    const eventInputs = event.inputs.map((input) =>
      getDefaultInputValue(input),
    );
    newInputs.push(eventInputs);
  });
  getReceives(contract).forEach(() => {
    newInputs.push([]);
  });
  inputs.value = newInputs;
}

function getDefaultInputValue(input: Input): unknown {
  if (isArray(input)) {
    return [getDefaultInputValue(getArrayParamItem(input, 0))];
  }
  if (isTuple(input)) {
    const length = input.components.length;
    return Array.from({ length }, (_, i) =>
      getDefaultInputValue(input.components[i]),
    );
  }
  if (isTupleArray(input)) {
    const tupleLength = input.components.length;
    return [
      Array.from({ length: tupleLength }, (_, i) =>
        getDefaultInputValue(input.components[i]),
      ),
    ];
  }
  if (input.type === 'bool') {
    return false;
  }
  return '';
}

function getAddress(contract: Contract | undefined): string {
  if (!contract) {
    return '';
  }
  const contractAddress = contract.address;
  return contractAddress;
}
</script>

<style scoped>
main {
  --header-height: 52px;
  --section-padding: 8px 12px;

  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
  height: calc(100vh - var(--header-height));
}

@media (width >= 768px) {
  main {
    flex-direction: row;
    gap: 0;
  }
}

nav {
  display: flex;
  position: sticky;
  top: 0;
  gap: var(--spacing-normal);
  flex: 1;
  flex-direction: column;
  padding: 8px;
  overflow-x: auto;
  overflow-y: auto;
}

@media (width >= 768px) {
  nav {
    min-width: 320px;
    padding: 0;
  }
}

.trigger-button {
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
</style>
