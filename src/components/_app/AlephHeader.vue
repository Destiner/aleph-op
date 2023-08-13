<template>
  <header>
    <div class="top">
      <div class="brand">
        <ChainIcon
          :chain="chainId"
          class="icon"
        />
        <div class="heading">
          <ChainSelector
            :model-value="chainId"
            @update:model-value="handleChainUpdate"
          />
          <div class="heading-subtitle">Developer Platform</div>
        </div>
      </div>
      <ButtonWallet />
    </div>
    <div class="bottom">
      <div class="nav">
        <router-link to="/docs">
          <IconBook class="nav-icon" /> Docs
        </router-link>
        <router-link to="/cookbook">
          <IconChef class="nav-icon" /> Cookbook
        </router-link>
        <router-link to="/json-rpc">
          <IconFileJson class="nav-icon" /> JSON-RPC
        </router-link>
        <router-link to="/contracts">
          <IconFileCode class="nav-icon" /> Contracts
        </router-link>
        <router-link to="/bridge">
          <IconLink class="nav-icon" /> Bridge
        </router-link>
        <router-link to="/faucet">
          <IconDrop class="nav-icon" /> Faucet
        </router-link>
        <router-link to="/tooling">
          <IconHammer class="nav-icon" /> Tooling
        </router-link>
        <router-link to="/ecosystem">
          <IconAtom class="nav-icon" /> Ecosystem
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import ButtonWallet from '@/components/__common/ButtonWallet.vue';
import IconAtom from '@/components/__common/icon/Atom.vue';
import IconBook from '@/components/__common/icon/Book.vue';
import IconChef from '@/components/__common/icon/Chef.vue';
import IconDrop from '@/components/__common/icon/Drop.vue';
import IconFileCode from '@/components/__common/icon/FileCode.vue';
import IconFileJson from '@/components/__common/icon/FileJson.vue';
import IconHammer from '@/components/__common/icon/Hammer.vue';
import IconLink from '@/components/__common/icon/Link.vue';
import useChain from '@/composables/useChain';
import { Chain } from '@/utils/chains';

import ChainIcon from './ChainIcon.vue';
import ChainSelector from './ChainSelector.vue';

const { id: chainId, setChain } = useChain();

function handleChainUpdate(chain: Chain): void {
  setChain(chain);
}
</script>

<style scoped>
header {
  background: var(--color-bg-inverted);
  color: var(--color-text-inverted);
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 24px;
}

.brand {
  display: flex;
  gap: 16px;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
}

.heading {
  display: flex;
  gap: var(--spacing-normal);
  align-items: center;
}

.heading-title {
  font-weight: bold;
}

.heading-subtitle {
  font-weight: 200;
}

.nav {
  display: flex;
  gap: var(--spacing-big);
  padding: 0 24px;
}

.nav a {
  display: flex;
  gap: var(--spacing-small);
  align-items: center;
  padding: 8px 4px;
  border-bottom: 3px solid transparent;
  opacity: 0.8;
  font-size: 14px;
}

.nav a.router-link-active {
  border-bottom-color: var(--color-accent);
  opacity: 1;
}

.nav a:hover {
  opacity: 1;
}

.nav-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
