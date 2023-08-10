<template>
  <AlephPage>
    <div class="page">
      <div class="content">
        <AlephTabs
          v-model="activeTab"
          class="tabs"
          :options="tabs"
        />
        <div class="pair-input">
          <div class="in">
            <div class="input-wrapper">
              <AlephLabel
                :value="'You pay'"
                :target="amountInInputId"
              />
              <input
                :id="amountInInputId"
                v-model="amountInValue"
                placeholder="0"
                @input="handleAmountInInput"
              />
            </div>
            <div>
              <div class="asset-view">
                <ChainIcon
                  class="asset-icon"
                  :chain="sourceChain"
                />
                {{ sourceAssetLabel }}
              </div>
            </div>
          </div>
          <div class="switch">
            <div
              class="switch-button"
              @click="handleSwitchButtonClick"
            >
              <ArrowDown class="icon" />
            </div>
          </div>
          <div class="out">
            <div class="input-wrapper">
              <AlephLabel
                :value="'You receive'"
                :target="amountOutInputId"
              />
              <input
                :id="amountOutInputId"
                v-model="amountOutValue"
                placeholder="0"
                @input="handleAmountOutInput"
              />
            </div>
            <div>
              <div class="asset-view">
                <ChainIcon
                  class="asset-icon"
                  :chain="targetChain"
                />
                {{ targetAssetLabel }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button :class="{ disabled: !isFormValid }">Send</button>
        </div>
      </div>
    </div>
  </AlephPage>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { computed, ref } from 'vue';

import AlephLabel from '@/components/__common/AlephLabel.vue';
import AlephTabs, {
  Option as TabOption,
} from '@/components/__common/AlephTabs.vue';
import ArrowDown from '@/components/__common/icon/ArrowDown.vue';
import AlephPage from '@/components/_app/AlephPage.vue';
import ChainIcon from '@/components/bridge/ChainIcon.vue';
import useChain from '@/composables/useChain';
import config from '@/config';
import { ETHEREUM, Chain } from '@/utils/chains';

const { id: chainId } = useChain();
const { meta } = config;
useHead({
  title: `Bridge | ${meta.title}`,
});

const MAINNET = 'mainnet';
const TESTNET = 'testnet';

const tabs: TabOption[] = [
  {
    label: 'Mainnet',
    value: MAINNET,
  },
  {
    label: 'Testnet',
    value: TESTNET,
  },
];
const activeTab = ref(MAINNET);

const amountInValue = ref('');
const amountOutValue = ref('');

const amountInInputId = computed(
  () => `input-${Math.random().toString().substring(2)}`,
);
const amountOutInputId = computed(
  () => `input-${Math.random().toString().substring(2)}`,
);

function handleAmountInInput(e: Event): void {
  const value = (e.target as HTMLInputElement)?.value;
  amountOutValue.value = value;
}
function handleAmountOutInput(e: Event): void {
  const value = (e.target as HTMLInputElement)?.value;
  amountInValue.value = value;
}

const isL1ToL2 = ref(true);
const sourceChain = computed<Chain>(() => {
  if (isL1ToL2.value) {
    return ETHEREUM;
  } else {
    return chainId.value;
  }
});
const sourceAssetLabel = computed(() => {
  if (isL1ToL2.value) {
    return 'L1 ETH';
  } else {
    return 'L2 ETH';
  }
});
const targetChain = computed<Chain>(() => {
  if (isL1ToL2.value) {
    return chainId.value;
  } else {
    return ETHEREUM;
  }
});
const targetAssetLabel = computed(() => {
  if (isL1ToL2.value) {
    return 'L2 ETH';
  } else {
    return 'L1 ETH';
  }
});
function handleSwitchButtonClick(): void {
  isL1ToL2.value = !isL1ToL2.value;
}

const isFormValid = computed(() => {
  return (
    amountInValue.value !== '' &&
    amountOutValue.value !== '' &&
    amountInValue.value !== '0' &&
    amountOutValue.value !== '0'
  );
});
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  margin: 60px;
}

.content {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column;
  width: 100%;
  padding: 16px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-large);
}

@media (width >= 768px) {
  .content {
    width: 480px;
  }
}

.tabs {
  width: 100%;
}

.pair-input {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-large);
  gap: var(--spacing-normal);
}

.in,
.out {
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: var(--border-radius-big);
  background: var(--color-bg-secondary);
  gap: var(--spacing-normal);
}

.in:has(input:focus),
.out:has(input:focus) {
  border: 1px solid var(--color-border-secondary);
}

.input-wrapper {
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--font-size-extra-large);
}

.asset-view {
  display: flex;
  align-items: center;
  width: 100px;
  padding: 4px;
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--border-radius-medium);
  gap: var(--spacing-normal);
}

.asset-icon {
  width: 16px;
  height: 16px;
}

.switch {
  display: flex;
  position: absolute;
  left: 50%;
  justify-content: center;
  transform: translate(-50%, 140%);
  border: 6px solid var(--color-bg-primary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-primary);
}

.switch-button {
  padding: 8px;
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-secondary);
  cursor: pointer;
}

.switch-button:hover {
  background: var(--color-bg-tertiary);
}

.icon {
  width: 16px;
  height: 16px;
  opacity: 0.8;
}

.icon:hover {
  opacity: 1;
}

button {
  width: 100%;
  padding: 8px;
  transition: all 0.25s ease-in-out;
  border: none;
  border-radius: var(--border-radius-large);
  opacity: 1;
  background: var(--color-accent);
  color: white;
  font-size: var(--font-size-big);
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

button.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
