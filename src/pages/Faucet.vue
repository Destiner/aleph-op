<template>
  <AlephPage>
    <div class="page">
      <div class="content">
        <div class="form">
          <div class="amount">
            <div class="input-wrapper">
              <AlephLabel
                :value="'Amount'"
                :target="amountInputId"
              />
              <input
                :id="amountInputId"
                v-model="amountValue"
                placeholder="0"
              />
            </div>
            <div>
              <div class="asset-view">
                <ChainIcon
                  class="asset-icon"
                  :chain="chain"
                />
                Testnet ETH
              </div>
            </div>
          </div>
          <div class="direction">
            <div class="direction-label">
              <ArrowDown class="icon" />
            </div>
          </div>
          <div class="address">
            <div class="input-wrapper">
              <AlephLabel
                :value="'Your address'"
                :target="addressInputId"
              />
              <input
                :id="addressInputId"
                v-model="addressValue"
                placeholder="vitalik.eth"
                spellcheck="false"
              />
            </div>
          </div>
        </div>
        <div>
          <button :class="{ disabled: !isFormValid }">Request</button>
        </div>
      </div>
    </div>
  </AlephPage>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { isAddress } from 'viem';
import { computed, ref } from 'vue';

import AlephLabel from '@/components/__common/AlephLabel.vue';
import ArrowDown from '@/components/__common/icon/ArrowDown.vue';
import AlephPage from '@/components/_app/AlephPage.vue';
import ChainIcon from '@/components/bridge/ChainIcon.vue';
import useChain from '@/composables/useChain';
import config from '@/config';
import { Chain } from '@/utils/chains';

const { id: chainId } = useChain();
const { meta } = config;
useHead({
  title: `Faucet | ${meta.title}`,
});

const amountValue = ref('');
const addressValue = ref('');

const amountInputId = computed(
  () => `input-${Math.random().toString().substring(2)}`,
);
const addressInputId = computed(
  () => `input-${Math.random().toString().substring(2)}`,
);

const chain = computed<Chain>(() => {
  return chainId.value;
});

const isFormValid = computed(() => {
  return (
    amountValue.value !== '' &&
    amountValue.value !== '0' &&
    (isAddress(addressValue.value) || isEns(addressValue.value))
  );
});

function isEns(address: string): boolean {
  return address.endsWith('.eth');
}
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

.form {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-large);
  gap: var(--spacing-normal);
}

.amount,
.address {
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: var(--border-radius-big);
  background: var(--color-bg-secondary);
  gap: var(--spacing-normal);
}

.amount:has(input:focus),
.address:has(input:focus) {
  border: 1px solid var(--color-border-secondary);
}

.input-wrapper {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

.address .input-wrapper {
  width: 100%;
}

input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
}

.amount input {
  font-size: var(--font-size-extra-large);
}

.address input {
  font-size: var(--font-size-big);
}

.asset-view {
  display: flex;
  align-items: center;
  width: 140px;
  padding: 4px;
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--border-radius-medium);
  gap: var(--spacing-normal);
}

.asset-icon {
  width: 16px;
  height: 16px;
}

.direction {
  display: flex;
  position: absolute;
  left: 50%;
  justify-content: center;
  transform: translate(-50%, 140%);
  border: 6px solid var(--color-bg-primary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-primary);
}

.direction-label {
  padding: 8px;
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-secondary);
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
