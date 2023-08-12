<template>
  <div
    v-if="isConnected"
    class="address"
    @click="openWalletModal"
  >
    <span v-if="address">{{ formatAddress(address) }}</span>
  </div>
  <AlephButton
    v-else
    class="button"
    type="accent"
    size="large"
    @click="openConnectorModal"
  >
    Connect
  </AlephButton>

  <AlephModal
    v-if="isConnected"
    :is-open="isWalletModalOpen"
    @close="handleWalletModalClose"
  >
    <div class="modal-panel">
      <div class="modal-header">
        <h2>Wallet</h2>
        <IconX
          class="icon"
          @click="handleWalletModalCloseIconClick"
        />
      </div>
      <div class="modal-body">
        {{ address }}
        <AlephButton
          class="button"
          type="regular"
          @click="disconnect"
        >
          Disconnect
        </AlephButton>
      </div>
    </div>
  </AlephModal>
  <AlephModal
    v-else
    :is-open="isConnectorModalOpen"
    @close="handleConnectorModalClose"
  >
    <div class="modal-panel">
      <div class="modal-header">
        <h2>Connect</h2>
        <IconX
          class="icon"
          @click="handleConnectorModalCloseIconClick"
        />
      </div>
      <div class="modal-body">
        <AlephButton
          v-if="isInjectedConnectorAvailable"
          class="button"
          type="regular"
          @click="connect('injected')"
        >
          Infura
        </AlephButton>
        <AlephButton
          class="button"
          type="regular"
          @click="connect('walletconnect')"
        >
          WalletConnect
        </AlephButton>
      </div>
    </div>
  </AlephModal>
</template>

<script setup lang="ts">
import {
  connect as wagmiConnect,
  disconnect as wagmiDisconnect,
} from '@wagmi/core';
import { Connector as BaseConnector } from '@wagmi/core/connectors';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { onMounted, ref } from 'vue';

import AlephButton from '@/components/__common/AlephButton.vue';
import AlephModal from '@/components/__common/AlephModal.vue';
import IconX from '@/components/__common/icon/X.vue';
import useAccount from '@/composables/useAccount';
import { formatAddress } from '@/utils/formatting';

type Connector = 'injected' | 'walletconnect';

const { address, isConnected } = useAccount();

const isInjectedConnectorAvailable = ref(false);

onMounted(() => {
  isInjectedConnectorAvailable.value = window.ethereum !== undefined;
});

async function connect(connectorType: Connector): Promise<void> {
  const connector = getConnector(connectorType);
  await wagmiConnect({
    connector,
  });
  isConnectorModalOpen.value = false;
}

function getConnector(type: Connector): BaseConnector {
  switch (type) {
    case 'injected':
      return new InjectedConnector();
    case 'walletconnect':
      return new WalletConnectConnector({
        options: {
          projectId: '8a4ed2b93f5f830338c40da9269977a0',
        },
      });
  }
}

function disconnect(): void {
  isWalletModalOpen.value = false;
  wagmiDisconnect();
}

const isWalletModalOpen = ref(false);
function openWalletModal(): void {
  isWalletModalOpen.value = true;
}
function handleWalletModalClose(): void {
  isWalletModalOpen.value = false;
}
function handleWalletModalCloseIconClick(): void {
  isWalletModalOpen.value = false;
}

const isConnectorModalOpen = ref(false);
function openConnectorModal(): void {
  isConnectorModalOpen.value = true;
}
function handleConnectorModalClose(): void {
  isConnectorModalOpen.value = false;
}
function handleConnectorModalCloseIconClick(): void {
  isConnectorModalOpen.value = false;
}
</script>

<style scoped>
.address {
  padding: 9px 16px;
  border: 2px solid var(--color-accent);
  border-radius: var(--border-radius-large);
  font-size: var(--font-size-normal);
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
}

.address:hover {
  background: hsla(var(--color-text-inverted-hsl) / 15%);
}

.modal-panel {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column;
  padding: 8px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h2 {
  margin: 0;
  font-size: var(--font-size-normal);
}

.modal-header .icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-normal);
}
</style>
